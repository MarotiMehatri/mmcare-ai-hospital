import api from "../../api/axios";

const getArrayData = (res) => {
  if (Array.isArray(res.data)) return res.data;
  return res.data?.data || [];
};

const getHealthStatus = (item) => {
  const oxygen = Number(String(item.oxygenLevel || "").replace("%", ""));
  const pulse = Number(String(item.pulseRate || "").replace("bpm", ""));
  const temp = Number(String(item.temperature || "").replace(/[^\d.]/g, ""));
  const systolic = Number(String(item.bp || "").split("/")[0]);

  if (oxygen < 94 || pulse > 110 || temp >= 101 || systolic >= 150) {
    return "Critical";
  }

  if (oxygen < 96 || pulse > 95 || temp >= 99 || systolic >= 135) {
    return "Under Observation";
  }

  return "Healthy";
};

const formatHealthSummary = (item) => ({
  id: item.id,
  recordId: item.prescriptionId || `REC-${item.id}`,
  patientId: item.patientId,
  patientName: item.patientName || "-",

  date: item.visitDate || item.createdAt || "-",

  doctorId: item.doctorId || "-",
  doctorName: item.doctorName || "Doctor",
  department: item.department || "-",

  bloodPressure: item.bp || "-",
  heartRate: item.pulseRate || "-",
  bloodSugar: item.bloodSugar || "-",
  temperature: item.temperature || "-",
  oxygenLevel: item.oxygenLevel || "-",
  weight: item.weight || "-",
  bmi: item.bmi || "-",

  diagnosis: item.diagnosis || item.secondaryDiagnosis || "-",
  notes:
    item.chiefComplaint ||
    item.dietAdvice ||
    item.exerciseAdvice ||
    item.followUpAdvice ||
    "No notes available",

  medicines: item.medicines || [],
  tests: item.tests || [],
  allergies: item.allergies || "-",

  status: getHealthStatus(item),

  rawStatus: item.status || "-",
  createdAt: item.createdAt || "-",
});

export const getHealthSummaryByPatientId = async (patientId) => {
  const res = await api.get("/prescriptions", {
    params: { patientId },
  });

  const records = getArrayData(res);

  return {
    ...res,
    data: records.map(formatHealthSummary),
  };
};

export const getRecentHealthSummaryByPatientId = async (patientId) => {
  const res = await api.get("/prescriptions", {
    params: { patientId },
  });

  const records = getArrayData(res);

  const sorted = records
    .map(formatHealthSummary)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return {
    ...res,
    data: sorted,
  };
};

export const getLatestHealthSummaryByPatientId = async (patientId) => {
  const res = await getRecentHealthSummaryByPatientId(patientId);

  return {
    ...res,
    data: res.data?.[0] || null,
  };
};

export default api;
