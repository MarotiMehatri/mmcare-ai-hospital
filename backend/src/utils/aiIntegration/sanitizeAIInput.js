const cleanText = (value) => {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ");
};

export const sanitizeAIInput = (body = {}) => {
  return {
    fullName: cleanText(body.fullName),
    age: Number(body.age) || "",
    gender: cleanText(body.gender),
    symptoms: cleanText(body.symptoms),
    medicalHistory: cleanText(body.medicalHistory),
    currentMedications: cleanText(body.currentMedications),
    question: cleanText(body.question),
  };
};
