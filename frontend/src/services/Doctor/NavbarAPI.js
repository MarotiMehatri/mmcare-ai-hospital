import api from "../../api/axios";

// Notifications
export const getDoctorNotifications = async (doctorId) => {
  return await api.get(`/notifications?doctorId=${doctorId}`);
};

// Messages
export const getDoctorMessages = async (doctorId) => {
  return await api.get(`/messages?doctorId=${doctorId}`);
};
