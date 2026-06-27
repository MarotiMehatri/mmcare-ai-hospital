import api from "../../api/axios";

export const getPatients = () => api.get("/patients");
export const getDoctors = () => api.get("/doctors");
export const getAppointments = () => api.get("/appointments");
export const getDepartments = () => api.get("/departments");
export const getBills = () => api.get("/doctorPayments");
