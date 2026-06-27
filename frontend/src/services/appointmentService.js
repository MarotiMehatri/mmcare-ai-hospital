import { createAppointment } from "../api/appointmentApi";

export const bookAppointment = async (formData) => {
  const payload = {
    ...formData,
    createdAt: new Date().toISOString(),
  };

  return await createAppointment(payload);
};
