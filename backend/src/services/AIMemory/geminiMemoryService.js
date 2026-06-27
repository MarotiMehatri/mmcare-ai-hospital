import { geminiClient } from "../../config/gemini.js";

export const generateStructuredMemory = async (payload) => {
  const prompt = `
You are an AI medical memory assistant for a hospital management system.

Your job is to extract only important long-term reusable memory from the given patient data.

Return ONLY valid JSON array.
Do not return markdown.
Do not return explanation text.

Each array item must follow this structure:
{
  "type": "symptom | condition | allergy | medication | preference | ai-summary | risk-alert",
  "title": "short title",
  "summary": "short useful summary",
  "priority": "low | medium | high",
  "tags": ["tag1", "tag2"],
  "source": "gemini"
}

Rules:
- keep only meaningful medical or behavioral memory
- ignore casual conversation
- include repeated symptoms
- include allergies
- include chronic conditions
- include important medication patterns
- include appointment preferences if useful

Patient Data:
${JSON.stringify(payload, null, 2)}
`;

  const response = await geminiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};
