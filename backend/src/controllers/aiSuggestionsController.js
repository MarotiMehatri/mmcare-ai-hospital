import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../../db.json");

const readDB = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ aiSuggestions: [] }, null, 2));
  }

  const data = fs.readFileSync(dbPath, "utf-8");

  if (!data.trim()) {
    return { aiSuggestions: [] };
  }

  const db = JSON.parse(data);
  db.aiSuggestions = db.aiSuggestions || [];

  return db;
};

const writeDB = (db) => {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

export const generateAISuggestions = (req, res) => {
  try {
    const db = readDB();
    const patient = req.body;

    const suggestions = [
      {
        id: "SUG-1",
        category: "Lifestyle",
        title: "Maintain a balanced diet",
        description:
          "Eat more fruits, vegetables, whole grains, and drink enough water daily.",
        priority: "Medium",
      },
      {
        id: "SUG-2",
        category: "Exercise",
        title: "Do light physical activity",
        description:
          "Walk for 20–30 minutes daily unless your doctor advised rest.",
        priority: "Low",
      },
      {
        id: "SUG-3",
        category: "Medical",
        title: "Follow up with doctor",
        description:
          "Continue regular health checkups and follow prescribed medicines.",
        priority: "High",
      },
    ];

    const data = {
      id: Date.now().toString(),
      patientId: patient?.id || patient?.patientId || "",
      patientName:
        patient?.fullName || patient?.FullName || patient?.name || "Patient",
      summary:
        "Based on your health profile, here are personalized AI health suggestions.",
      priority: "Medium",
      suggestions,
      riskAlerts: [
        {
          id: "RISK-1",
          title: "Do not ignore severe symptoms",
          message:
            "If you have chest pain, breathing difficulty, fainting, or severe pain, contact a doctor immediately.",
          level: "High",
        },
      ],
      recommendedDepartment: patient?.department || "General Medicine",
      recommendedDoctorType: "General Physician",
      generatedAt: new Date().toISOString(),
    };

    db.aiSuggestions.push(data);
    writeDB(db);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate AI suggestions",
      error: error.message,
    });
  }
};

export const getAISuggestionsByPatient = (req, res) => {
  try {
    const db = readDB();
    const { patientId } = req.params;

    const history = db.aiSuggestions.filter(
      (item) => String(item.patientId) === String(patientId),
    );

    res.status(200).json({
      success: true,
      data: history.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load AI suggestions history",
      error: error.message,
    });
  }
};
