import fs from "fs/promises";
import path from "path";

const DB_FILE = path.join(process.cwd(), "db.json");

const readDB = async () => {
  const data = await fs.readFile(DB_FILE, "utf-8");
  return JSON.parse(data);
};

const writeDB = async (db) => {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
};

export const getPrescriptions = async (req, res) => {
  try {
    const db = await readDB();

    let prescriptions = db.prescriptions || [];

    if (req.query.patientId) {
      prescriptions = prescriptions.filter(
        (p) => String(p.patientId) === String(req.query.patientId)
      );
    }

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch prescriptions",
      error: error.message,
    });
  }
};

export const createPrescription = async (req, res) => {
  try {
    const db = await readDB();

    if (!Array.isArray(db.prescriptions)) {
      db.prescriptions = [];
    }

    const newPrescription = {
      ...req.body,
      id: db.prescriptions.length
        ? Number(db.prescriptions[db.prescriptions.length - 1].id) + 1
        : 1,
      createdAt: req.body.createdAt || new Date().toISOString(),
    };

    db.prescriptions.push(newPrescription);

    await writeDB(db);

    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      data: newPrescription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create prescription",
      error: error.message,
    });
  }
};