import api from "../../api/axios";

export const createHealthSummary = async (summaryData) => {
  return await api.post("/healthSummaries", summaryData);
};

export const getPatientHealthSummaries = async (patientId) => {
  return await api.get(
    `/healthSummaries?patientId=${patientId}&_sort=createdAt&_order=desc`,
  );
};

export const getLatestPatientHealthSummary = async (patientId) => {
  return await api.get(
    `/healthSummaries?patientId=${patientId}&_sort=createdAt&_order=desc&_limit=1`,
  );
};

export const deleteHealthSummary = async (summaryId) => {
  return await api.delete(`/healthSummaries/${summaryId}`);
};

export const getAllPatients = async () => {
  return await api.get("/patients");
};
