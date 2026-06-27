export const buildAppointmentPrompt = ({
  symptoms,
  duration,
  severity,
  age,
  gender,
  visitType,
  city,
  medicalHistory,
}) => {
  return `You are an AI hospital appointment assistant.

Your job:
- Recommend the correct hospital department
- Recommend the doctor specialization
- Set urgency as low, medium, or high
- Suggest visitType as online or offline
- Give a short reason
- Give short preparation advice
- If symptoms look dangerous, set emergency=true
- Do not provide a final disease diagnosis
- Return only valid JSON 

Patient details:
Symptoms : ${symptoms || ""}
Duration : ${duration || ""}
Severity : ${severity || ""}
Age : ${age || ""}
Gender : ${gender || ""}
Visit Type Preference : ${visitType || ""}
City : ${city || ""}
Medical History : ${Array.isArray(medicalHistory) ? medicalHistory.join(", ") : medicalHistory || ""} 
Allowed departments:
- General Medicine
- Cardiology
- Dermatology
- Pediatrics
- Orthopedics
- Neurology
- ENT
- Pulmonology
- Gastroenterology

Return JSON in this exact format:
{
  "department": "",
  "specialization": "",
  "urgency": "",
  "visitType": "",
  "reason": "",
  "preparation": "",
  "emergency": false
}
`;
};
