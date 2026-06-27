import axios from "axios";

const API_URL = "http://localhost:5000/appointments";

export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(API_URL, appointmentData);
    return response.data;
  } catch (error) {
    throw new Error(error, "Failed to book appointment");
  }
};
