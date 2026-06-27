import api from "../../api/axios";

export const getMessages = async (patientId) => {
  return api.get(`/messages?patientId=${patientId}`);
};

export const getDoctors = async () => {
  return api.get("/doctors");
};
