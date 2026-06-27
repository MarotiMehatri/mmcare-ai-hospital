import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { formatVitalsForCharts } from "../utils/healthTrendHelpers.js";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const dataPath = path.join(_dirname, "../data/healthRecords.json");

export const getPatientHealthRecord = async (patientId) => {
  const file = await fs.readFile(dataPath, "utf-8");
  const records = JSON.parse(file);

  const patient = records.find(
    (item) => Number(item.patientId) === Number(patientId),
  );
  if (!patient) return null;

  return {
    ...patient,
    vitalsHistory: formatVitalsForCharts(patient.vitalsHistory || []),
  };
};
