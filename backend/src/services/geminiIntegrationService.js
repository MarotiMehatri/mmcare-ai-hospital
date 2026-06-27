import { geminiClient } from "../config/gemini.js";

export const generateAIIntegrationResult = async (sanitizedData) => {
  const prompt = `
You are an AI medical assistant inside a Hospital Management System.

Patient details:
- Full Name: ${sanitizedData.fullName || "Not provided"}
- Age: ${sanitizedData.age || "Not provided"}
- Gender: ${sanitizedData.gender || "Not provided"}
- Symptoms: ${sanitizedData.symptoms || "Not provided"}
- Medical History: ${sanitizedData.medicalHistory || "Not provided"}
- Current Medications: ${sanitizedData.currentMedications || "Not provided"}
- User Question: ${sanitizedData.question || "Give hospital guidance"}

Return JSON in this format:
{
  "summary": "",
  "urgency": "low",
  "recommendedDepartment": "",
  "recommendedSpecialist": "",
  "precautions": [],
  "nextSteps": [],
  "disclaimer": ""
}
`;

  const response = await geminiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  try {
    return JSON.parse(text);
  } catch {
    return {
      summary: text,
      urgency: "medium",
      recommendedDepartment: "General Medicine",
      recommendedSpecialist: "General Physician",
      precautions: [],
      nextSteps: [],
      disclaimer: "AI-generated guidance only. Please consult a doctor.",
    };
  }
};
