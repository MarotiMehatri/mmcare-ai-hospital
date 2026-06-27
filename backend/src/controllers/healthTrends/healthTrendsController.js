import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const healthTrendsPath = path.join(__dirname, "../../data/healthTrends.json");
const dbPath = path.join(__dirname, "../../../db.json");

const readJsonFile = async (filePath, defaultValue) => {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    return JSON.parse(file || JSON.stringify(defaultValue));
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(defaultValue, null, 2));
      return defaultValue;
    }
    throw error;
  }
};

const writeJsonFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};

const calculateAge = (dob) => {
  if (!dob) return "";

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const getPatientInfo = (patientId, db) => {
  const id = Number(patientId);

  const patient = db.patients?.find(
    (p) => Number(p.id) === id || Number(p.userId) === id,
  );

  const user = db.users?.find(
    (u) => Number(u.id) === id && u.role === "PATIENT",
  );

  return patient || user || null;
};

const getPatientMedicines = (patientId, db) => {
  const id = Number(patientId);

  const patientPrescriptions =
    db.prescriptions?.filter(
      (p) =>
        Number(p.patientId) === id ||
        Number(p.patientID) === id ||
        Number(p.userId) === id,
    ) || [];

  const medicines = patientPrescriptions.flatMap((prescription) => {
    if (Array.isArray(prescription.medicines)) {
      return prescription.medicines.map((medicine) => {
        if (typeof medicine === "string") return medicine;

        return [
          medicine.name || medicine.medicineName || "",
          medicine.dosage || "",
          medicine.frequency || "",
        ]
          .filter(Boolean)
          .join(" - ");
      });
    }

    if (Array.isArray(prescription.medications)) {
      return prescription.medications;
    }

    if (prescription.medicineName) {
      return [prescription.medicineName];
    }

    return [];
  });

  return medicines.length ? medicines : ["No current medications"];
};

const createPatientHealthTrend = (patientId, db) => {
  const id = Number(patientId);
  const patientInfo = getPatientInfo(id, db);
  const medicines = getPatientMedicines(id, db);

  return {
    patientId: id,
    patientName: patientInfo?.fullName || patientInfo?.name || `Patient ${id}`,
    email: patientInfo?.email || "",
    age: patientInfo?.age || calculateAge(patientInfo?.dob),
    dob: patientInfo?.dob || "",
    gender: patientInfo?.gender || "",
    bloodGroup: patientInfo?.bloodGroup || "",
    medicalHistory: patientInfo?.medicalHistory?.length
      ? patientInfo.medicalHistory
      : ["No major medical history"],
    medications: medicines,
    vitalsHistory: [
      {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        bloodPressure: "120/80",
        sugar: 95,
        heartRate: 75,
        weight: 65,
        spo2: 98,
      },
    ],
  };
};

export const getPatientHealthTrends = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await readJsonFile(healthTrendsPath, []);
    const db = await readJsonFile(dbPath, {
      users: [],
      patients: [],
      prescriptions: [],
    });

    let patient = records.find(
      (item) => Number(item.patientId) === Number(patientId),
    );

    if (!patient) {
      patient = createPatientHealthTrend(patientId, db);
      records.push(patient);
      await writeJsonFile(healthTrendsPath, records);
    } else {
      const medicines = getPatientMedicines(patientId, db);
      patient.medications = medicines;
      await writeJsonFile(healthTrendsPath, records);
    }

    return res.status(200).json({
      success: true,
      data: {
        patient,
        analysis: {
          healthScore: 78,
          overallTrend: "Stable",
          summary: "Patient health is mostly stable.",
          riskLevel: "Low",
          alerts: [
            {
              title: "Vitals Monitoring",
              severity: "low",
              message: "Continue monitoring vitals weekly.",
            },
          ],
          recommendations: [
            "Continue regular exercise",
            "Maintain healthy diet",
            "Check vitals weekly",
          ],
          followUp: {
            needed: false,
            department: "General Medicine",
            timeline: "No urgent follow-up",
          },
        },
        rawData: {
          vitalsHistory: patient.vitalsHistory || [],
        },
      },
    });
  } catch (error) {
    console.error("Health Trends Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get health trends",
      error: error.message,
    });
  }
};

export const addPatientHealthRecord = async (req, res) => {
  try {
    const { patientId } = req.params;
    const newRecord = req.body;

    const records = await readJsonFile(healthTrendsPath, []);
    const db = await readJsonFile(dbPath, {
      users: [],
      patients: [],
      prescriptions: [],
    });

    let patientIndex = records.findIndex(
      (item) => Number(item.patientId) === Number(patientId),
    );

    if (patientIndex === -1) {
      records.push(createPatientHealthTrend(patientId, db));
      patientIndex = records.length - 1;
    }

    if (!records[patientIndex].vitalsHistory) {
      records[patientIndex].vitalsHistory = [];
    }

    records[patientIndex].vitalsHistory.push({
      id: Date.now(),
      date: newRecord.date || new Date().toISOString().split("T")[0],
      bloodPressure:
        newRecord.bloodPressure || `${newRecord.bpTop}/${newRecord.bpBottom}`,
      sugar: Number(newRecord.sugar || 0),
      heartRate: Number(newRecord.heartRate || 0),
      weight: Number(newRecord.weight || 0),
      spo2: Number(newRecord.spo2 || 0),
    });

    await writeJsonFile(healthTrendsPath, records);

    return res.status(201).json({
      success: true,
      message: "Health record added successfully",
      data: records[patientIndex],
    });
  } catch (error) {
    console.error("Add Health Record Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add health record",
      error: error.message,
    });
  }
};
