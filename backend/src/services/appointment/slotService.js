const doctorSlots = {
  D101: ["10:00 AM", "11:30 AM", "04:00 PM"],
  D102: ["09:00 AM", "12:00 PM", "03:30 PM"],
  D103: ["10:30 AM", "01:00 PM", "05:30 PM"],
  D104: ["11:00 AM", "02:00 PM", "04:30 PM"],
  D105: ["09:30 AM", "01:30 PM", "06:00 PM"],
  D106: ["10:15 AM", "12:45 PM", "05:15 PM"],
};

export const getSlotsByDoctorId = (doctorId) => {
  return doctorSlots[doctorId] || [];
};
