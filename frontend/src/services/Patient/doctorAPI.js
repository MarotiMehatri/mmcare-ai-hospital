import api from "../../api/axios";

export const getDoctors = async () => {
  const res = await api.get("/doctors");

  const doctors = res.data?.data || res.data?.doctors || res.data || [];

  return Array.isArray(doctors) ? doctors : [];
};

export const getRecentDoctors = async () => {
  const doctors = await getDoctors();
  return doctors.slice(0, 5);
};

export const getAllDoctors = getDoctors;
