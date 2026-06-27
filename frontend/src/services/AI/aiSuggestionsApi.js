import axios from "axios";

const aiSuggestionsApi = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

aiSuggestionsApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export const generateAISuggestions = async (payload) => {
  const response = await aiSuggestionsApi.post(
    "/ai-suggestions/generate",
    payload,
  );

  return response.data;
};

export const getAISuggestionsHistory = async (patientId) => {
  const response = await aiSuggestionsApi.get(
    `/ai-suggestions/patient/${patientId}`,
  );

  return response.data;
};

export default aiSuggestionsApi;
