import api from "../../api/axios";

const getArrayData = (res) => {
  if (Array.isArray(res.data)) return res.data;
  return res.data?.data || [];
};

const formatHistory = (item) => ({
  id: item.id,

  visitId: item.prescriptionId || `VISIT-${item.id}`,

  patientId: item.patientId,
  patientName: item.patientName || "-",

  doctorId: item.doctorId || "-",
  doctorName: item.doctorName || "Doctor",

  department: item.department || "-",
  specialization: item.specialization || "-",

  diagnosis:
    item.diagnosis ||
    item.disease ||
    item.secondaryDiagnosis ||
    "General Consultation",

  treatment:
    item.medicines?.length > 0
      ? item.medicines.map((m) => m.name).join(", ")
      : item.doctorAdvice || item.dietAdvice || "Consultation",

  visitDate: item.visitDate || item.createdAt || "-",
  visitTime: item.visitTime || "-",
  consultationType: item.consultationType || "-",

  bp: item.bp || "-",
  pulseRate: item.pulseRate || "-",
  temperature: item.temperature || "-",
  oxygenLevel: item.oxygenLevel || "-",
  weight: item.weight || "-",
  bmi: item.bmi || "-",

  symptoms: Array.isArray(item.symptoms) ? item.symptoms.join(", ") : "-",

  medicines: item.medicines || [],
  testsRecommended: item.testsRecommended || [],

  notes:
    item.chiefComplaint ||
    item.dietAdvice ||
    item.exerciseAdvice ||
    item.lifestyleAdvice ||
    "-",

  followUpDate: item.followUpDate || "-",
  followUpNotes: item.followUpNotes || "-",

  status:
    item.status?.toLowerCase() === "completed" ? "Completed" : "Pending Review",

  createdAt: item.createdAt || "-",
});

export const getMedicalHistoryByPatientId = async (patientId) => {
  const res = await api.get("/prescriptions", {
    params: { patientId },
  });

  const prescriptions = getArrayData(res);

  return prescriptions
    .filter((item) => String(item.patientId) === String(patientId))
    .map(formatHistory);
};

export const getRecentMedicalHistoryByPatientId = async (patientId) => {
  const history = await getMedicalHistoryByPatientId(patientId);

  return history
    .sort(
      (a, b) =>
        new Date(b.visitDate || b.createdAt) -
        new Date(a.visitDate || a.createdAt),
    )
    .slice(0, 5);
};

export default api;
