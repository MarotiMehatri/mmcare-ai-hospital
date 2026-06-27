import api from "../../api/axios";

export const getNotifications = async (patientId) => {
  return api.get(`/notifications?patientId=${patientId}`);
};
