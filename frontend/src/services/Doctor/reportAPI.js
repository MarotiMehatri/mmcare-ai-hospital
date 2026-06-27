import api from "../../api/axios";

export const getAllPatients = async () => {
  const res = await api.get("/patients");
  return res.data || [];
};

export const getDoctorReports = async (doctorId) => {
  const res = await api.get("/medical-reports");

  const reports = res.data || [];

  return reports.filter(
    (report) => String(report.doctorId) === String(doctorId),
  );
};

export const getPatientReports = async (patientId) => {
  const res = await api.get("/medical-reports");

  const reports = res.data || [];

  return reports.filter(
    (report) => String(report.patientId) === String(patientId),
  );
};

export const uploadMedicalReport = async (reportData) => {
  const res = await api.post("/medical-reports", reportData);
  return res.data;
};

export const deleteMedicalReport = async (id) => {
  const res = await api.delete(`/medical-reports/${id}`);
  return res.data;
};

export const updateMedicalReport = async (reportId, updatedData) => {
  const res = await api.patch(`/medical-reports/${reportId}`, updatedData);
  return res.data;
};
