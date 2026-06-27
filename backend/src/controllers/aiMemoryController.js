import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

/* =========================
   READ DB
========================= */

const readDB = () => {
  try {
    return JSON.parse(fs.readFileSync(dbPath, "utf8"));
  } catch {
    return {
      aiMemory: [],
    };
  }
};

/* =========================
   WRITE DB
========================= */

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export const getAllAIMemory = (req, res) => {
  try {
    const db = readDB();

    return res.status(200).json({
      success: true,
      count: db.aiMemory?.length || 0,
      data: db.aiMemory || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all AI Memory",
    });
  }
};

/* =========================
   CREATE AI MEMORY
========================= */

export const createAIMemory = (req, res) => {
  try {
    const db = readDB();

    const newMemory = {
      id: Date.now(),
      patientId: req.body.patientId,
      patientName: req.body.patientName,

      type: req.body.type || "ai-summary",

      title: req.body.title || "AI Memory",

      description: req.body.description || "",

      source: req.body.source || "Doctor Report",

      critical: req.body.critical || false,

      createdAt: new Date().toISOString(),
    };

    db.aiMemory = db.aiMemory || [];

    db.aiMemory.push(newMemory);

    writeDB(db);

    return res.status(201).json({
      success: true,
      message: "AI Memory created successfully",
      data: newMemory,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create AI Memory",
    });
  }
};

/* =========================
   GET MEMORY BY PATIENT
========================= */

export const getAIMemoryByPatient = (req, res) => {
  try {
    const { patientId } = req.params;

    const db = readDB();

    const memory = (db.aiMemory || []).filter(
      (item) => String(item.patientId) === String(patientId),
    );

    return res.status(200).json({
      success: true,
      count: memory.length,
      data: memory,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch AI Memory",
    });
  }
};

/* =========================
   MEMORY SUMMARY
========================= */

export const getAIMemorySummary = (req, res) => {
  try {
    const { patientId } = req.params;

    const db = readDB();

    const memory = (db.aiMemory || []).filter(
      (item) => String(item.patientId) === String(patientId),
    );

    const summary = {
      totalRecords: memory.length,

      symptomCount: memory.filter((item) => item.type === "symptom").length,

      medicationCount: memory.filter((item) => item.type === "medication")
        .length,

      criticalCount: memory.filter((item) => item.critical === true).length,

      allergyCount: memory.filter((item) => item.type === "allergy").length,

      conditionCount: memory.filter((item) => item.type === "condition").length,
    };

    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch memory summary",
    });
  }
};
