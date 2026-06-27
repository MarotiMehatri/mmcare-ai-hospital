import axios from "axios";

const aiMemoryApi = axios.create({
  baseURL: "http://localhost:8000/ai-memory",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllAIMemory = async () => {
  const res = await aiMemoryApi.get("/");
  return res.data;
};

export const getPatientMemory = async (patientId) => {
  const res = await aiMemoryApi.get(`/patient/${patientId}`);
  return res.data;
};

export const getPatientMemorySummary = async (patientId) => {
  const res = await aiMemoryApi.get(`/summary/${patientId}`);
  return res.data;
};

export const createAIMemory = async (memoryData) => {
  const res = await aiMemoryApi.post("/", memoryData);
  return res.data;
};

export default aiMemoryApi;
