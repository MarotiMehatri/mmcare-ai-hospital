import fs from "fs/promises";
import path from "path";

const DB_FILE = path.join(process.cwd(), "db.json");

const readDB = async () => JSON.parse(await fs.readFile(DB_FILE, "utf-8"));
const writeDB = async (db) =>
  fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));

export const getMessages = async (req, res) => {
  try {
    const db = await readDB();
    let messages = db.messages || [];

    if (req.query.patientId) {
      messages = messages.filter(
        (m) => String(m.patientId) === String(req.query.patientId),
      );
    }

    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages" });
  }
};

export const createMessage = async (req, res) => {
  try {
    const db = await readDB();
    const messages = db.messages || [];

    const newMessage = {
      id: messages.length
        ? Math.max(...messages.map((m) => Number(m.id) || 0)) + 1
        : 1,
      ...req.body,
      timestamp: new Date().toISOString(),
    };

    db.messages = [...messages, newMessage];
    await writeDB(db);

    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create message" });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const db = await readDB();
    const messages = db.messages || [];
    const index = messages.findIndex(
      (m) => String(m.id) === String(req.params.id),
    );

    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    db.messages[index] = { ...messages[index], ...req.body };
    await writeDB(db);

    res.json({ success: true, data: db.messages[index] });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update message" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const db = await readDB();
    db.messages = (db.messages || []).filter(
      (m) => String(m.id) !== String(req.params.id),
    );

    await writeDB(db);
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete message" });
  }
};
