import api from "../../api/axios";

/*
|--------------------------------------------------------------------------
| Get all medical reports
|--------------------------------------------------------------------------
| GET /api/medical-reports
*/
export const getAllReports = async () => {
  return api.get("/medical-reports");
};

/*
|--------------------------------------------------------------------------
| Get recent medical reports
|--------------------------------------------------------------------------
*/
export const getRecentReports = async () => {
  const response = await api.get("/medical-reports");

  const reports = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response?.data?.data)
      ? response.data.data
      : [];

  const sortedReports = [...reports].sort((a, b) => {
    const dateA = new Date(
      a.createdAt ||
      a.reportDate ||
      a.uploadDate ||
      0
    ).getTime();

    const dateB = new Date(
      b.createdAt ||
      b.reportDate ||
      b.uploadDate ||
      0
    ).getTime();

    return dateB - dateA;
  });

  return {
    ...response,
    data: sortedReports.slice(0, 3),
  };
};

/*
|--------------------------------------------------------------------------
| Update medical report status
|--------------------------------------------------------------------------
| PATCH /api/medical-reports/:id
*/
export const updateReportStatus = async (id, status) => {
  if (!id) {
    throw new Error("Medical report ID is required.");
  }

  if (!status) {
    throw new Error("Report status is required.");
  }

  return api.patch(`/medical-reports/${id}`, {
    status,
  });
};

/*
|--------------------------------------------------------------------------
| Delete medical report
|--------------------------------------------------------------------------
| DELETE /api/medical-reports/:id
*/
export const deleteReport = async (id) => {
  if (!id) {
    throw new Error("Medical report ID is required.");
  }

  return api.delete(`/medical-reports/${id}`);
};

export default api;