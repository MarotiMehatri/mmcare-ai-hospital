import API from "../../api/axios";

// Get all appointments
export const getAppointments = async () => {
  const res = await API.get("/appointments");
  return res.data?.data || res.data || [];
};

// Create appointment
export const createAppointment = async (data) => {
  const res = await API.post("/appointments", data);
  return res.data;
};

// Get appointments by patient id
export const getAppointmentsByPatientId = async (patientId) => {
  const res = await API.get("/appointments", {
    params: {
      patientId: String(patientId),
    },
  });

  return res.data?.data || res.data || [];
};

// Get appointments by doctor id
export const getAppointmentsByDoctorId = async (doctorId) => {
  const res = await API.get("/appointments", {
    params: {
      doctorId: String(doctorId),
    },
  });

  return res.data?.data || res.data || [];
};

// Get appointment by id
export const getAppointmentById = async (id) => {
  const res = await API.get(`/appointments/${id}`);
  return res.data?.data || res.data;
};

// Update appointment
export const updateAppointment = async (id, appointment) => {
  const res = await API.put(`/appointments/${id}`, appointment);
  return res.data;
};

// Delete appointment
export const deleteAppointment = async (id) => {
  const res = await API.delete(`/appointments/${id}`);
  return res.data;
};
