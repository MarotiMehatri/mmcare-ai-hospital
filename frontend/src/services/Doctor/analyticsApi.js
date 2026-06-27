import api from "../../api/axios";

export const getPatients = () => api.get("/patients");
export const getAppointments = () => api.get("/appointments");
export const getPrescriptions = () => api.get("/prescriptions");
export const getReports = () => api.get("/medicalReports");
