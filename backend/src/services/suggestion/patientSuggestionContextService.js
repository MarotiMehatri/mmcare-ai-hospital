export const buildPatientSuggestionContext = async (sanitizedInput = {}) => {
  return {
    patientId: sanitizedInput.patientId || "",
    patientID: sanitizedInput.patientID || "",
    fullName: sanitizedInput.fullName || "",
    age: sanitizedInput.age || "",
    gender: sanitizedInput.gender || "",
    bloodGroup: sanitizedInput.bloodGroup || "",
    email: sanitizedInput.email || "",
    mobile: sanitizedInput.mobile || "",
    allergies: Array.isArray(sanitizedInput.allergies)
      ? sanitizedInput.allergies
      : [],
    conditions: Array.isArray(sanitizedInput.conditions)
      ? sanitizedInput.conditions
      : [],
    chronicDiseases: Array.isArray(sanitizedInput.chronicDiseases)
      ? sanitizedInput.chronicDiseases
      : [],
    medications: Array.isArray(sanitizedInput.medications)
      ? sanitizedInput.medications
      : [],
    recentSymptoms: Array.isArray(sanitizedInput.recentSymptoms)
      ? sanitizedInput.recentSymptoms
      : [],
    vitals:
      sanitizedInput.vitals && typeof sanitizedInput.vitals === "object"
        ? sanitizedInput.vitals
        : {},
    lastVisit: sanitizedInput.lastVisit || "",
    medicalHistory: Array.isArray(sanitizedInput.medicalHistory)
      ? sanitizedInput.medicalHistory
      : [],
    appointmentHistory: Array.isArray(sanitizedInput.appointmentHistory)
      ? sanitizedInput.appointmentHistory
      : [],
  };
};
