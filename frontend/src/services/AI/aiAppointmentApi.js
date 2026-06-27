import api from "../../api/axios";

export const getAppointmentRecommendation = async (payload) => {
  const res = await api.post("/appointment-recommendation", payload);
  return res.data;
};

export const getDoctorSlots = async (doctorId) => {
  const res = await api.get(`/doctor-slots/${doctorId}`);
  return res.data;
};

export const bookAppointment = async (payload) => {
  const res = await api.post("/book-appointment", payload);
  return res.data;
};
