import fs from "fs/promises";
import path from "path";

const DB_FILE = path.join(process.cwd(), "db.json");

const readDB = async () => JSON.parse(await fs.readFile(DB_FILE, "utf-8"));
const writeDB = async (db) =>
  fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));

export const getNotifications = async (req, res) => {
  try {
    const db = await readDB();
    let notifications = db.notifications || [];

    if (req.query.patientId) {
      notifications = notifications.filter(
        (n) => String(n.patientId) === String(req.query.patientId)
      );
    }

    res.json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

export const createNotification = async (req, res) => {
  try {
    const db = await readDB();
    const notifications = db.notifications || [];

    const newNotification = {
      id: notifications.length
        ? Math.max(...notifications.map((n) => Number(n.id) || 0)) + 1
        : 1,
      ...req.body,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    db.notifications = [...notifications, newNotification];
    await writeDB(db);

    res.status(201).json({ success: true, data: newNotification });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create notification",
    });
  }
};

export const updateNotification = async (req, res) => {
  try {
    const db = await readDB();
    const notifications = db.notifications || [];
    const index = notifications.findIndex(
      (n) => String(n.id) === String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    db.notifications[index] = {
      ...notifications[index],
      ...req.body,
    };

    await writeDB(db);

    res.json({ success: true, data: db.notifications[index] });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const db = await readDB();

    db.notifications = (db.notifications || []).filter(
      (n) => String(n.id) !== String(req.params.id)
    );

    await writeDB(db);

    res.json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete notification",
    });
  }
};