import api from "../../api/axios";

/* ==========================
         PATIENT API
========================== */

const getArrayData = (res) => {
  const data = res?.data?.data || res?.data || [];
  return Array.isArray(data) ? data : [];
};

const getObjectData = (res) => {
  return res?.data?.data || res?.data || null;
};

// GET ALL PATIENTS
export const getPatients = async () => {
  const res = await api.get("/patients");
  return getArrayData(res);
};

// GET PATIENT BY ID
export const getPatientById = async (id) => {
  const res = await api.get(`/patients/${id}`);
  return getObjectData(res);
};

// GET PATIENT BY USER ID
export const getPatientByUserId = async (userId) => {
  const res = await api.get("/patients");

  const patients = getArrayData(res);

  return (
    patients.find(
      (patient) =>
        String(patient.userId) === String(userId) ||
        String(patient.id) === String(userId),
    ) || null
  );
};

// GET PATIENT BY PATIENT ID
export const getPatientByPatientID = async (patientID) => {
  const res = await api.get("/patients");

  const patients = getArrayData(res);

  return patients.filter(
    (patient) => String(patient.patientID) === String(patientID),
  );
};

// GET PATIENT BY EMAIL
export const getPatientByEmail = async (email) => {
  const res = await api.get("/patients");

  const patients = getArrayData(res);
  const lowerEmail = String(email || "")
    .trim()
    .toLowerCase();

  return patients.filter(
    (patient) =>
      String(patient.email || "")
        .trim()
        .toLowerCase() === lowerEmail,
  );
};

// CREATE PATIENT
export const createPatient = async (patient) => {
  const res = await api.post("/patients", patient);
  return getObjectData(res);
};

// UPDATE PATIENT
export const updatePatient = async (id, patient) => {
  const res = await api.put(`/patients/${id}`, patient);
  return getObjectData(res);
};

// DELETE PATIENT
export const deletePatient = async (id) => {
  const res = await api.delete(`/patients/${id}`);
  return res.data;
};
