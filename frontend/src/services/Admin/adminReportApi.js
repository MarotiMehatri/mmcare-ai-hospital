import api from "../../api/axios";

export const getAllReports = () => api.get("/medical-reports");

export const getRecentReports = async () => {
  const res = await api.get("/medical-reports");
  const sorted = (res.data || []).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  return { data: sorted.slice(0, 3) };
};

export const updateReportStatus = (id, status) =>
  api.patch(`/medical-reports/${id}`, { status });

export const deleteReport = (id) => api.delete(`/medical-reports/${id}`);

export default api;
