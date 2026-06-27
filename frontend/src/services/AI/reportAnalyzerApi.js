
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/report-analyzer",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const analyzeReport = async (formData) => {
  const response = await API.post("/analyze", formData);
  return response.data;
};

export const getPatientReportHistory = async (patientId) => {
  const response = await axios.get(
    `http://localhost:8000/api/report-analyzer/patient/${patientId}`,
  );
  return response.data;
};

export const getSingleReportAnalysis = async (reportId) => {
  const response = await axios.get(
    `http://localhost:8000/api/report-analyzer/${reportId}`,
  );
  return response.data;
};
