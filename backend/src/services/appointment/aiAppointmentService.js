import axios from "axios";
const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
const AI_APPOINTMENT_API = `${API_URL}/appointments-ai`;
/** * Get AI appointment recommendation */ export const getAppointmentRecommendation =
  async (payload) => {
    try {
      const response = await axios.post(
        `${AI_APPOINTMENT_API}/appointment-recommendation`,
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
/** * Get available doctor slots */ export const getDoctorSlots = async (
  doctorId,
) => {
  try {
    if (!doctorId) {
      throw new Error("doctorId is required");
    }
    const response = await axios.get(
      `${AI_APPOINTMENT_API}/doctor-slots/${doctorId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Doctor Slots API Error:", error);
    console.error("Response Data:", error?.response?.data);
    throw error;
  }
};
/** * Book appointment */ export const bookAppointment = async (payload) => {
  try {
    const response = await axios.post(
      `${AI_APPOINTMENT_API}/book-appointment`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Book Appointment API Error:", error);
    console.error("Response Data:", error?.response?.data);
    console.error("Response Status:", error?.response?.status);
    throw error;
  }
};
