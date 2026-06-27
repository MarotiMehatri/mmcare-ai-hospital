import api from "../../api/axios";

const getArrayData = (res, key) => {
  const data = res?.data?.data || res?.data?.[key] || res?.data || [];
  return Array.isArray(data) ? data : [];
};

export const getAllDoctors = async () => {
  const res = await api.get("/doctors");
  return getArrayData(res, "doctors");
};

export const getMessagesByPatientAndDoctor = async (patientId, doctorId) => {
  const res = await api.get("/messages");

  const messages = getArrayData(res, "messages");

  return Array.isArray(messages)
    ? messages
        .filter(
          (msg) =>
            String(msg.patientId) === String(patientId) &&
            String(msg.doctorId) === String(doctorId),
        )
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    : [];
};

export const getMessagesByPatient = async (patientId) => {
  const res = await api.get("/messages");

  const messages = getArrayData(res, "messages");

  return messages.filter((msg) => String(msg.patientId) === String(patientId));
};

export const sendMessage = async (messageData) => {
  const res = await api.post("/messages", messageData);
  return res?.data?.data || res?.data || messageData;
};

export const getDoctorsMessagedByPatient = async (patientId) => {
  const [messages, doctors] = await Promise.all([
    getMessagesByPatient(patientId),
    getAllDoctors(),
  ]);

  const uniqueDoctorIds = [
    ...new Set(messages.map((msg) => String(msg.doctorId))),
  ];

  return doctors.filter((doctor) =>
    uniqueDoctorIds.includes(String(doctor.id)),
  );
};

export default api;
