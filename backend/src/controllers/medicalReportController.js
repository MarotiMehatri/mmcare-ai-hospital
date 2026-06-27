import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../../db.json");

const readDB = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(
      dbPath,
      JSON.stringify(
        {
          medicalReports: [],
          patients: [],
        },
        null,
        2,
      ),
    );
  }

  const data = fs.readFileSync(dbPath, "utf-8");

  if (!data.trim()) {
    return {
      medicalReports: [],
      patients: [],
    };
  }

  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET ALL REPORTS
export const getAllMedicalReports = (req, res) => {
  try {
    const db = readDB();

    res.status(200).json(db.medicalReports || []);
  } catch (error) {
    console.error("RET medical reports error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load medical reports",
      error: error.message,
      dbPath,
    });
  }
};

// ADD REPORT
export const uploadMedicalReport = (req, res) => {
  try {
    const db = readDB();

    const newReport = {
      id: Date.now().toString(),
      ...req.body,
    };

    db.medicalReports = db.medicalReports || [];
    db.medicalReports.push(newReport);

    writeDB(db);

    return res.status(201).json({
      success: true,
      message: "Medical report uploaded successfully",
      data: newReport,
    });
  } catch (error) {
    console.error("POST medical report error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save medical report",
      error: error.message,
      dbPath,
    });
  }
};

// UPDATE REPORT
export const updateMedicalReport = (req, res) => {
  try {
    const db = readDB();
    const { id } = req.params;

    db.medicalReports = db.medicalReports || [];

    const index = db.medicalReports.findIndex(
      (report) => String(report.id) === String(id),
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Medical report not found",
      });
    }

    db.medicalReports[index] = {
      ...db.medicalReports[index],
      ...req.body,
    };

    writeDB(db);

    res.status(200).json({
      success: true,
      message: "Medical report updated successfully",
      data: db.medicalReports[index],
    });
  } catch (error) {
    console.error("PUT medical report error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update medical report",
      error: error.message,
      dbPath,
    });
  }
};

// DELETE REPORT
export const deleteMedicalReport = (req, res) => {
  try {
    const db = readDB();
    const { id } = req.params;

    db.medicalReports = db.medicalReports || [];

    const oldLength = db.medicalReports.length;

    db.medicalReports = db.medicalReports.filter(
      (report) => String(report.id) !== String(id),
    );

    if (db.medicalReports.length === oldLength) {
      return res.status(404).json({
        success: false,
        message: "Medical report not found",
      });
    }

    writeDB(db);

    res.status(200).json({
      success: true,
      message: "Medical report deleted successfully",
    });
  } catch (error) {
    console.error("DELETE medical report error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete medical report",
      error: error.message,
      dbPath,
    });
  }
};
