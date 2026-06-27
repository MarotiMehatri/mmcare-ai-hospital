import api from "../../api/axios";

const getArrayData = (response) => {
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  if (Array.isArray(response?.data?.appointments)) {
    return response.data.appointments;
  }

  return [];
};

export const getAppointmentsByDoctorId = async (doctorId) => {
  const res = await api.get(`/appointments?doctorId=${doctorId}`);

  const appointments = getArrayData(res).filter(
    (item) => String(item.doctorId) === String(doctorId),
  );

  return { data: appointments };
};

export const getRecentAppointmentsByDoctorId = async (doctorId) => {
  const res = await api.get(`/appointments?doctorId=${doctorId}`);

  const appointments = getArrayData(res).filter(
    (item) => String(item.doctorId) === String(doctorId),
  );

  const sorted = appointments.sort(
    (a, b) =>
      new Date(b.createdAt || b.appointmentDate) -
      new Date(a.createdAt || a.appointmentDate),
  );

  return { data: sorted.slice(0, 3) };
};

export const updateAppointmentStatus = (id, status) =>
  api.patch(`/appointments/${id}`, { status });

export default api;
