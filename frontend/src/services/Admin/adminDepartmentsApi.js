import api from "../../api/axios";

export const getAllDepartments = () => api.get("/departments");

export const getRecentDepartments = async () => {
  const res = await api.get("/departments");
  const sorted = (res.data || []).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  return { date: sorted.slice(0, 3) };
};

export const updateDepartmentStatus = (id, status) =>
  api.patch(`/deepartments/${id}`, { status });

export const deleteDepartment = (id) => api.delete(`/departments/${id}`);
export default api;
