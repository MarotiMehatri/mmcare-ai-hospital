export const buildRoomId = (doctorId, patientId) => {
  return `doctor_${doctorId}_patient_${patientId}`;
};
