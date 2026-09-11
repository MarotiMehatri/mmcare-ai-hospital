import api from "../../api/axios";

export const getPrescriptionsByDoctor = async (doctorId) => {
  const res = await api.get("/prescriptions", {
    params: {
      doctorId,
    },
  });

  return res.data?.data || [];
};

export const getPrescriptionsByPatient = async (patientId) => {
  const res = await api.get("/prescriptions", {
    params: {
      patientId,
    },
  });

  return res.data?.data || [];
};

export const getPrescriptionById = async (id) => {
  const res = await api.get(`/prescriptions/${id}`);

  return res.data;
};

export const createPrescription = async (data) => {
  const res = await api.post("/prescriptions", data);

  return res.data;
};

export const updatePrescription = async (id, payload) => {
  const res = await api.patch(
    `/prescriptions/${id}`,
    payload,
  );

  return res.data;
};

export const deletePrescription = async (id) => {
  const res = await api.delete(
    `/prescriptions/${id}`,
  );

  return res.data;
};