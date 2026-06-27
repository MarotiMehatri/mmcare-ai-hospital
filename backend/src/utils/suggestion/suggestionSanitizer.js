export const sanitizeSuggestionInput = (body = {}) => {
  return {
    patientId: body.patientId || "",
    patientID: body.patientID || "",
    fullName: body.fullName || "",
    age: body.age || "",
    gender: body.gender || "",
    bloodGroup: body.bloodGroup || "",
    email: body.email || "",
    mobile: body.mobile || "",
    allergies: Array.isArray(body.allergies) ? body.allergies : [],
    conditions: Array.isArray(body.conditions) ? body.conditions : [],
    chronicDiseases: Array.isArray(body.chronicDiseases)
      ? body.chronicDiseases
      : [],
    medications: Array.isArray(body.medications) ? body.medications : [],
    recentSymptoms: Array.isArray(body.recentSymptoms)
      ? body.recentSymptoms
      : [],
    vitals:
      typeof body.vitals === "object" && body.vitals !== null
        ? body.vitals
        : {},
    lastVisit: body.lastVisit || "",
    medicalHistory: Array.isArray(body.medicalHistory)
      ? body.medicalHistory
      : [],
    appointmentHistory: Array.isArray(body.appointmentHistory)
      ? body.appointmentHistory
      : [],
  };
};
