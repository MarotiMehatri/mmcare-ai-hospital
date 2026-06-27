import fs from "fs/promises";
import path from "path";
import { ensureDir } from "../utils/fileHelpers.js";

const dataDir = path.join(process.cwd(), "src", "data");
const reportFilePath = path.join(dataDir, "reportAnalyses.json");

const defaultData = {
  reportAnalyses: [],
};

const ensureStorageFile = async () => {
  ensureDir(dataDir);

  try {
    await fs.access(reportFilePath);
  } catch {
    await fs.writeFile(reportFilePath, JSON.stringify(defaultData, null, 2));
  }
};

export const readReportStorage = async () => {
  await ensureStorageFile();
  const raw = await fs.readFile(reportFilePath, "utf-8");
  return JSON.parse(raw);
};

export const writeReportStorage = async (data) => {
  await ensureStorageFile();
  await fs.writeFile(reportFilePath, JSON.stringify(data, null, 2));
};

export const saveReportAnalysis = async (record) => {
  const db = await readReportStorage();

  const newRecord = {
    id: db.reportAnalyses.length
      ? db.reportAnalyses[db.reportAnalyses.length - 1].id + 1
      : 1,
    ...record,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.reportAnalyses.push(newRecord);
  await writeReportStorage(db);

  return newRecord;
};

export const getPatientReportHistory = async (patientId) => {
  const db = await readReportStorage();

  return db.reportAnalyses
    .filter((item) => String(item.patientId) === String(patientId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getSingleReportAnalysis = async (id) => {
  const db = await readReportStorage();
  return db.reportAnalyses.find((item) => String(item.id) === String(id));
};
