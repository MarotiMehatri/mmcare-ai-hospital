import axios from "axios";

const DOCTOR_API = "http://localhost:5000/doctors";

export const getAllDoctors = async () => {
  const res = await axios.get(DOCTOR_API);
  return res.data;
};

export const getDoctorById = async (doctorId) => {
  const res = await axios.get(`${DOCTOR_API}/${doctorId}`);
  return res.data;
};

export const normalizeDoctor = (doctor) => {
  const consultationMode =
    doctor?.consultationMode?.replace(/\s+/g, " ").trim().toLowerCase() || "";

  return {
    id: doctor?.id || "",
    fullName: doctor?.FullName || doctor?.fullName || "",
    email: doctor?.email || "",
    department: doctor?.department || "",
    specialization: doctor?.specialization || "",
    city: doctor?.city || "",
    state: doctor?.state || "",
    profilePhoto:
      doctor?.profilePhoto && doctor.profilePhoto.trim() !== ""
        ? doctor.profilePhoto
        : "/AIDoctors/default-doctor.png",
    consultationMode,
    consultationFee: Number(doctor?.consultationFee) || 0,
    experience: Number(doctor?.experience) || 0,
    rating: Number(doctor?.rating) || 0,
    availableDays: doctor?.availableDays || "",
    availableTime: doctor?.availableTime || "",
  };
};

export const getDoctorsByAIRecommendation = async ({
  department,
  specialization,
  visitType,
  city,
}) => {
  const doctors = await getAllDoctors();
  const normalizedDoctors = doctors.map(normalizeDoctor);

  return normalizedDoctors.filter((doctor) => {
    const doctorDepartment = doctor.department?.toLowerCase?.() || "";
    const doctorSpecialization = doctor.specialization?.toLowerCase?.() || "";
    const doctorCity = doctor.city?.toLowerCase?.() || "";
    const doctorMode = doctor.consultationMode?.toLowerCase?.() || "";

    const departmentMatch = department
      ? doctorDepartment === department.toLowerCase()
      : true;

    const specializationMatch = specialization
      ? doctorSpecialization.includes(specialization.toLowerCase()) ||
        specialization.toLowerCase().includes(doctorSpecialization)
      : true;

    const cityMatch = city ? doctorCity === city.toLowerCase() : true;

    const modeMatch = visitType
      ? doctorMode.includes(visitType.toLowerCase())
      : true;

    return departmentMatch && specializationMatch && cityMatch && modeMatch;
  });
};
