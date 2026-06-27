
import api from "../api/axios"

export const getDoctors = async () => {
  const response = await api.get("/doctors");
  return response.data;
};

export const getMessagesByPatientAndDoctor = async (patientId, doctorId) => {
  const response = await api.get(
    `/messages?patientId=${patientId}&doctorId=${doctorId}&_sort=timestamp&_order=asc`,
  );
  return response.data;
};

export const sendMessage = async (messageData) => {
  const response = await api.post("/messages", messageData);
  return response.data;
};
