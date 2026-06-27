import api from "../../api/axios";

const getArrayData = (response) => {
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  if (Array.isArray(response?.data?.messages)) {
    return response.data.messages;
  }

  if (Array.isArray(response?.data?.patients)) {
    return response.data.patients;
  }

  return [];
};

export const getAllPatients = async () => {
  const res = await api.get("/patients");
  return { data: getArrayData(res) };
};

export const getMessagesByDoctorAndPatient = async (doctorId, patientId) => {
  const res = await api.get(
    `/messages?doctorId=${doctorId}&patientId=${patientId}&_sort=timestamp&_order=asc`,
  );

  const messages = getArrayData(res).filter(
    (msg) =>
      String(msg.doctorId) === String(doctorId) &&
      String(msg.patientId) === String(patientId),
  );

  return { data: messages };
};

export const sendMessage = async (messageData) => {
  const response = await api.post("/messages", messageData);
  return response;
};

export const getRecentChatsForDoctor = async (doctorId) => {
  const [patientsRes, messagesRes] = await Promise.all([
    api.get("/patients"),
    api.get(`/messages?doctorId=${doctorId}`),
  ]);

  const patients = getArrayData(patientsRes);
  const messages = getArrayData(messagesRes);

  const latestMap = new Map();

  messages.forEach((msg) => {
    const old = latestMap.get(msg.patientId);

    if (!old || new Date(msg.timestamp) > new Date(old.timestamp)) {
      latestMap.set(msg.patientId, msg);
    }
  });

  const merged = patients
    .filter((patient) => latestMap.has(patient.id))
    .map((patient) => {
      const latest = latestMap.get(patient.id);

      return {
        ...patient,
        latestMessage: latest?.text || "",
        latestTimestamp: latest?.timestamp || "",
        isOnline: patient.isOnline || false,
        lastSeen: patient.lastSeen || "",
      };
    })
    .sort((a, b) => new Date(b.latestTimestamp) - new Date(a.latestTimestamp));

  return { data: merged.slice(0, 3) };
};

export default api;
