import axiosInstance from "./axiosInstance";

export const getAIAnalysis = async (payload) => {
  const response = await axiosInstance.post("/ai-integration/analyze", payload);
  return response.data;
};

export const getAIConfig = async () => {
  const response = await axiosInstance.get("/ai-integration/config");
  return response.data;
};
