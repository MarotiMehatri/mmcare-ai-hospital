import axiosInstance from "./axiosInstance";

export const sendAIChatMessage = async (payload) => {
  const response = await axiosInstance.post("/ai-chat/message", payload);
  return response.data;
};
