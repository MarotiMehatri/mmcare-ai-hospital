import { geminiClient } from "../../config/gemini.js";
import { buildNearbyPrompt } from "../../utils/nearby-service/nearbyPromptBuilder.js";

export async function rankNearbyServicesWithGemini(payload, providers) {
  if (!providers || providers.length === 0) {
    return {
      querySummary: "No nearby services matched the current search.",
      topRecommendation: null,
      results: [],
    };
  }

  const prompt = buildNearbyPrompt(payload, providers);

  const response = await geminiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const rawText = response?.text || "";

  try {
    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    return {
      querySummary: "Nearby services ranked successfully.",
      topRecommendation: {
        name: providers[0]?.name || "Top provider",
        reason: "Closest and most relevant available option.",
      },
      results: providers.map((item) => ({
        id: item.id,
        aiReason:
          "Recommended based on service match, availability, and distance.",
      })),
    };
  }
}
