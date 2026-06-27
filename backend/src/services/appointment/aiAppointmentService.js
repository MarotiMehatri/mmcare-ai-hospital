import axios from "axios";

const API_URL = "http://localhost:8000/api/ai";

export const getAppointmentRecommendation = async (payload) => {
  try {
    const response = await axios.post(
      `${API_URL}/appointment-recommendation`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Appointment Recommendation API Error:", error);
    console.error("Response Data:", error?.response?.data);
    console.error("Response Status:", error?.response?.status);
    throw error;
  }
};

export const getDoctorSlots = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}/doctor-slots/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error("Doctor Slots API Error:", error);
    console.error("Response Data:", error?.response?.data);
    throw error;
  }
};

export const bookAppointment = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/book-appointment`, payload);
    return response.data;
  } catch (error) {
    console.error("Book Appointment API Error:", error);
    console.error("Response Data:", error?.response?.data);
    throw error;
  }
};
