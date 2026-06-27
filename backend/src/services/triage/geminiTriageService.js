import { geminiClient } from "../../config/gemini.js";
import { buildTriagePrompt } from "../../utils/triage/triagePromptBuilder.js";

export const analyzeSymptomsWithGemini = async (payload) => {
  const prompt = buildTriagePrompt(payload);

  const response = await geminiClient.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  let text = response.text?.trim() || "";

  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  }
};
