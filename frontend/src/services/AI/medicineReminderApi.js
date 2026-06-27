import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/medicine-reminders",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPatientReminders = async (patientId) => {
  const res = await api.get(`/patient/${patientId}`);
  return res.data;
};

export const getTodaySchedule = async (patientId) => {
  const res = await api.get(`/patient/${patientId}/today`);
  return res.data;
};

export const getAdherenceStats = async (patientId) => {
  const res = await api.get(`/patient/${patientId}/adherence`);
  return res.data;
};

export const getRefillAlerts = async (patientId) => {
  const res = await api.get(`/patient/${patientId}/refill-alerts`);
  return res.data;
};

export const getDashboardSummary = async (patientId) => {
  const res = await api.get(`/patient/${patientId}/dashboard-summary`);
  return res.data;
};

export const createReminder = async (data) => {
  const res = await api.post("/", data);
  return res.data;
};

export const updateReminder = async (id, data) => {
  const res = await api.put(`/${id}`, data);
  return res.data;
};

export const deleteReminder = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

export const logReminderAction = async (id, data) => {
  const res = await api.post(`/${id}/log`, data);
  return res.data;
};

export const getReminderLogs = async (id) => {
  const res = await api.get(`/${id}/logs`);
  return res.data;
};

export const aiParseMedicineText = async (text) => {
  const res = await api.post("/ai-parse", { text });
  return res.data;
};

export const aiAdherenceSummary = async (patientId) => {
  const res = await api.post("/ai-summary", { patientId });
  return res.data;
};
