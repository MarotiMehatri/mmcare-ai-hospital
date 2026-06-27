import api from "../api/axios";

export const getAIHealthSummary = async (patientId) => {
  const response = await api.get(`/api/users/ai-summary/${patientId}`);

  return response.data;
};
