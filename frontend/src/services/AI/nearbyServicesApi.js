import axios from "axios";

const nearbyApi = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const searchNearbyServicesApi = async (payload) => {
  try {
    const response = await nearbyApi.post("/nearby-services/search", payload);
    return response.data;
  } catch (error) {
    console.error(
      "Nearby Services API Error:",
      error?.response?.data || error.message,
    );
    throw error;
  }
};
