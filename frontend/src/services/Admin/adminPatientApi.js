import api from "../../api/axios";

export const getAllPatients = () => api.get("/patients");

export const getPatientById = (id) => api.get(`/patients/${id}`);

export const createPatient = (patientData) =>
  api.post("/patients", patientData);

export const updatePatient = (id, patientData) =>
  api.put(`/patients/${id}`, patientData);

export const deletePatient = (id) => api.delete(`/patients/${id}`);
