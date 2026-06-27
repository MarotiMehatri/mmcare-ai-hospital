import api from "../../api/axios";

/* ==========================
         DOCTOR API
========================== */

// GET ALL DOCTORS
export const getDoctors = () => api.get("/doctors");

// GET RECENT DOCTORS
export const getRecentDoctors = async () => {
  const res = await api.get("/doctors");

  const doctors = Array.isArray(res.data) ? res.data : res.data?.data || [];

  return doctors.slice(0, 5);
};

// GET DOCTOR BY ID
export const getDoctorById = (id) => api.get(`/doctors/${id}`);

// GET DOCTOR BY USER ID
export const getDoctorByUserId = (userId) =>
  api.get("/doctors", {
    params: { userId },
  });

// GET DOCTOR BY EMAIL
export const getDoctorByEmail = (email) =>
  api.get("/doctors", {
    params: {
      email: email?.trim().toLowerCase(),
    },
  });

// CREATE DOCTOR
export const createDoctor = (doctorData) =>
  api.post("/doctors", {
    ...doctorData,
    email: doctorData.email?.trim().toLowerCase(),
  });

// UPDATE DOCTOR
export const updateDoctor = (id, doctorData) =>
  api.put(`/doctors/${id}`, doctorData);

// DELETE DOCTOR
export const deleteDoctor = (id) => api.delete(`/doctors/${id}`);

// SEARCH DOCTORS
export const searchDoctors = (query) =>
  api.get("/doctors", {
    params: {
      q: query?.trim(),
    },
  });

