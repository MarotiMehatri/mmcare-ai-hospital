import axios from "axios";

const API_URL = "http://localhost:8000/api/health-trends";

export const getHealthTrendsByPatientId = async (patientId, signal) => {
  const response = await axios.get(`${API_URL}/patient/${patientId}`, {
    signal,
  });

  return response.data;
};
