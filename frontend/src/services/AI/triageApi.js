import axios from "axios";
import { getCache, saveCache } from "../../utils/triageStorage";

const triageApi = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

triageApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

triageApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Triage API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const analyzeTriage = async (payload) => {
  const response = await triageApi.post("/triage/analyze", payload, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  return response.data;
};

export const getTriageHistory = async (patientId) => {
  const response = await triageApi.get(`/triage/history/${patientId}`, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  return response.data;
};

export const getSymptomMaster = async () => {
  const cached = getCache("symptom_master");
  if (cached) return cached;

  const response = await triageApi.get("/master/symptoms");
  const data = response.data;
  saveCache("symptom_master", data, 30);
  return data;
};

export default triageApi;
