import api from "../../api/axios";

export const getPrescriptionsByDoctor = async (doctorId) => {
  const res = await api.get("/prescriptions", {
    params: {
      _sort: "createdAt",
      _order: "desc",
    },
  });

  const prescriptions = res.data?.data || [];

  return prescriptions.filter(
    (item) => String(item.doctorId) === String(doctorId),
  );
};

export const getPrescriptionsByPatient = async (patientId) => {
  const res = await api.get("/prescriptions", {
    params: {
      _sort: "createdAt",
      _order: "desc",
    },
  });

  const prescriptions = res.data?.data || [];

  return prescriptions.filter(
    (item) => Number(item.patientId) === Number(patientId),
  );
};

export const getPrescriptionById = async (id) => {
  const res = await api.get(`/prescriptions/${id}`);
  return res.data;
};

export const createPrescription = (data) => {
  return api.post("/prescriptions", data);
};

export const updatePrescription = async (id, payload) => {
  const res = await api.patch(`/prescriptions/${id}`, payload);
  return res.data;
};

export const deletePrescription = async (id) => {
  const res = await api.delete(`/prescriptions/${id}`);
  return res.data;
};
