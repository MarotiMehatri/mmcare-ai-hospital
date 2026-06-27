export const sanitizeTriageInput = (payload = {}) => {
  return {
    patientId: payload.patientId || "",
    fullName: payload.fullName || "",
    age: Number(payload.age) || 0,
    gender: payload.gender || "",
    symptoms: payload.symptoms || "",
    duration: payload.duration || "",
    painLevel: Number(payload.painLevel) || 0,
    fever: payload.fever || "",
    breathingIssue: Boolean(payload.breathingIssue),
    dizziness: Boolean(payload.dizziness),
    chestPain: Boolean(payload.chestPain),
    vomiting: Boolean(payload.vomiting),
    existingConditions: payload.existingConditions || "",
    medications: payload.medications || "",
    allergies: payload.allergies || "",
  };
};
