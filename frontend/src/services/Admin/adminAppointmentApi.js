import api from "../../api/axios";

const getAppointmentsArray = (res) => {
  if (Array.isArray(res.data)) return res.data;

  return res.data.appointments || res.data.data || [];
};

export const getAllAppointments = async () => {
  const res = await api.get("/appointments");

  return {
    ...res,
    data: getAppointmentsArray(res),
  };
};

export const getRecentAppointments = async () => {
  const res = await api.get("/appointments");

  const appointments = getAppointmentsArray(res);

  const sorted = [...appointments].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.appointmentDate);
    const dateB = new Date(b.createdAt || b.appointmentDate);

    return dateB - dateA;
  });

  return { data: sorted.slice(0, 3) };
};

export const updateAppointmentStatus = (id, status) =>
  api.patch(`/appointments/${id}`, { status });

export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

export default api;
