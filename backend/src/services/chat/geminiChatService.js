import { geminiClient } from "../../config/gemini.js";
import { buildAIChatPrompt } from "../../utils/chat/buildAIChatPrompt.js";

const createFallbackResponse = (message) => {
  return {
    title: "AI Health Guidance",
    overview: `You asked: "${message}". Based on your question, it would be best to monitor your symptoms carefully and seek medical advice if the issue is persistent, worsening, or concerning. A hospital consultation may be helpful depending on severity and duration.`,
    possibleCauses: [
      "Common illness or infection",
      "Temporary weakness or inflammation",
      "Underlying medical issue depending on symptoms",
    ],
    precautions: [
      "Monitor your symptoms carefully",
      "Stay hydrated",
      "Take adequate rest",
      "Avoid self-medicating without proper advice",
    ],
    homeCare: [
      "Rest and avoid overexertion",
      "Drink enough fluids",
      "Take light meals if tolerated",
      "Track symptom duration and severity",
    ],
    whenToConsultDoctor: [
      "If symptoms persist for more than a few days",
      "If symptoms become more severe",
      "If new concerning symptoms appear",
      "If daily activities become difficult",
    ],
    emergencySigns: [
      "Difficulty breathing",
      "Chest pain",
      "Loss of consciousness",
      "Severe confusion or sudden worsening",
    ],
    recommendedDepartment: "General Medicine",
    recommendedSpecialist: "General Physician",
    nextSteps: [
      "Continue monitoring symptoms",
      "Book a doctor consultation if symptoms continue",
      "Seek urgent care if warning signs appear",
    ],
    disclaimer:
      "This is AI-generated guidance and not a final medical diagnosis.",
  };
};

export const generateDetailedChatReply = async ({ patient, message }) => {
  const prompt = buildAIChatPrompt({ patient, message });

  try {
    const response = await geminiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
        responseMimeType: "application/json",
      },
    });

    const rawText =
      typeof response.text === "function" ? response.text() : response.text;

    console.log("Patient question:", message);
    console.log("Gemini raw response:", rawText);

    try {
      const parsed = JSON.parse(rawText);

      return {
        title: parsed.title || "AI Health Guidance",
        overview: parsed.overview || `Guidance for: ${message}`,
        possibleCauses: parsed.possibleCauses || [],
        precautions: parsed.precautions || [],
        homeCare: parsed.homeCare || [],
        whenToConsultDoctor: parsed.whenToConsultDoctor || [],
        emergencySigns: parsed.emergencySigns || [],
        recommendedDepartment:
          parsed.recommendedDepartment || "General Medicine",
        recommendedSpecialist:
          parsed.recommendedSpecialist || "General Physician",
        nextSteps: parsed.nextSteps || [],
        disclaimer:
          parsed.disclaimer ||
          "This is AI-generated guidance and not a final medical diagnosis.",
      };
    } catch (parseError) {
      console.error("JSON parse failed:", parseError.message);
      return createFallbackResponse(message);
    }
  } catch (error) {
    console.error("Gemini service error:", error.message);
    return createFallbackResponse(message);
  }
};
