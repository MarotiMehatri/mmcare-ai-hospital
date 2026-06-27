export const getRoomId = (doctorId, patientId) => {
  return `doctor_${doctorId}_patient_${patientId}`;
};

export const buildSidebarChatItem = (doctorId, patient, messages = []) => {
  const roomId = getRoomId(doctorId, patient.id);

  const roomMessages = messages.filter((msg) => msg.roomId === roomId);
  const lastMessage = roomMessages[roomMessages.length - 1];

  const unreadForDoctor = roomMessages.filter(
    (msg) => msg.sender === "patient" && msg.status !== "seen",
  ).length;

  return {
    id: patient.id,
    roomId,
    doctorId,
    patientId: patient.id,
    patientName: patient.fullName,
    patientPhoto: patient.profilePhoto,
    lastMessage: lastMessage?.text || "Start conversation",
    lastMessageTime: lastMessage?.timestamp || patient.lastSeen || "",
    unreadForDoctor,
    patient,
  };
};
