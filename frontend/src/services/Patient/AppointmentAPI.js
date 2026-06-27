import api from "../../api/axios";

export const createAppointment = async (data) => {
  return await api.post("/appointments", data);
};

export const cancelAppointment = async (id) => {
  return await api.patch(`/appointments/${id}`, { status: "Cancelled" });
};

export const checkAppointmentSlot = (
  doctorId,
  appointmentData,
  appointmentTime,
) =>
  api.get(
    `/appointments?doctorId=${doctorId}&appointmentDate=${appointmentData}&appointmentTime=${appointmentTime}`,
  );

/* GET APPOINTMENTS BY PATIENT ID */
export const getAppointmentsByPatientId = async (patientId) => {
  const res = await api.get("/appointments", {
    params: { patientId },
  });

  return res.data?.data || [];
};

/* GET RECENT APPOINTMENTS BY PATIENT ID */
export const getRecentAppointmentsByPatientId = async (patientId) => {
  const res = await api.get("/appointments", {
    params: { patientId },
  });

  const appointments = res.data?.data || [];

  return appointments
    .sort(
      (a, b) =>
        new Date(b.date || b.appointmentDate || b.createdAt) -
        new Date(a.date || a.appointmentDate || a.createdAt),
    )
    .slice(0, 3);
};

export default api;
