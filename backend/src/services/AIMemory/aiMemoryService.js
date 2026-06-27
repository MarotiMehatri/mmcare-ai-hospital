import {
  getAllMemoryRecords,
  setAllMemoryRecords,
  addMemoryRecords,
  addSingleMemoryRecord,
} from "../../utils/AIMemory/memoryStore.js";
import { generateStructuredMemory } from "./geminiMemoryService.js";

export const getPatientMemoryRecords = async (patientId) => {
  const records = getAllMemoryRecords();

  return records.filter((item) => String(item.patientId) === String(patientId));
};

export const getPatientMemorySummary = async (patientId) => {
  const records = await getPatientMemoryRecords(patientId);

  return {
    totalRecords: records.length,
    symptomCount: records.filter((item) => item.type === "symptom").length,
    conditionCount: records.filter((item) => item.type === "condition").length,
    allergyCount: records.filter((item) => item.type === "allergy").length,
    medicationCount: records.filter((item) => item.type === "medication")
      .length,
    preferenceCount: records.filter((item) => item.type === "preference")
      .length,
    criticalCount: records.filter((item) => item.priority === "high").length,
  };
};

export const createManualMemoryRecord = async (payload) => {
  const record = {
    id: `mem_${Date.now()}`,
    patientId: payload.patientId,
    patientID: payload.patientID || "",
    type: payload.type || "ai-summary",
    title: payload.title || "Memory Note",
    summary: payload.summary || "",
    priority: payload.priority || "medium",
    tags: payload.tags || [],
    source: payload.source || "manual",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  addSingleMemoryRecord(record);
  return record;
};

export const updateMemoryRecordById = async (memoryId, payload) => {
  const records = getAllMemoryRecords();

  const updatedRecords = records.map((item) =>
    item.id === memoryId
      ? {
          ...item,
          ...payload,
          updatedAt: new Date().toISOString(),
        }
      : item,
  );

  setAllMemoryRecords(updatedRecords);

  return updatedRecords.find((item) => item.id === memoryId) || null;
};

export const deleteMemoryRecordById = async (memoryId) => {
  const records = getAllMemoryRecords();

  const filtered = records.filter((item) => item.id !== memoryId);
  setAllMemoryRecords(filtered);

  return true;
};

export const extractAndSaveMemoryFromAI = async (payload) => {
  const rawText = await generateStructuredMemory(payload);

  let parsed = [];

  try {
    parsed = JSON.parse(rawText);
  } catch (error) {
    console.error("Gemini JSON parse error:", error.message);
    throw new Error("Gemini returned invalid JSON");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Gemini response is not an array");
  }

  const savedRecords = parsed.map((item, index) => ({
    id: `mem_${Date.now()}_${index}`,
    patientId: payload.patientId,
    patientID: payload.patientID || "",
    type: item.type || "ai-summary",
    title: item.title || "AI Memory",
    summary: item.summary || "",
    priority: item.priority || "low",
    tags: Array.isArray(item.tags) ? item.tags : [],
    source: item.source || "gemini",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  addMemoryRecords(savedRecords);

  return savedRecords;
};
