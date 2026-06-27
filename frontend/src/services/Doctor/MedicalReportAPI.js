import api from "../../api/axios";

export const getAllMedicalReports = () => api.get("/medical-reports");

export const createMedicalReport = (data) => api.post("/medical-reports", data);

export const uploadMedicalReport = (data) => api.post("/medical-reports", data);

export const updateMedicalReport = (id, data) =>
  api.put(`/medical-reports/${id}`, data);

export const deleteMedicalReport = (id) => api.delete(`/medical-reports/${id}`);
