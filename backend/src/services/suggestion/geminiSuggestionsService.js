import { geminiClient } from "../../config/gemini.js";

const FALLBACK_RESPONSE = {
  summary: "AI suggestion service is temporarily unavailable.",
  priority: "medium",
  suggestions: [
    {
      id: "fallback-1",
      category: "General",
      title: "Book a doctor review",
      description: "Please consult a General Physician for a proper review.",
      priority: "medium",
      actionType: "appointment",
    },
  ],
  riskAlerts: ["Unable to generate AI suggestions right now."],
  recommendedDepartment: "General Medicine",
  recommendedDoctorType: "General Physician",
};

export const generateSuggestionsWithGemini = async (patientContext) => {
  try {
    const schema = {
      type: "object",
      properties: {
        summary: { type: "string" },
        priority: {
          type: "string",
          enum: ["low", "medium", "high"],
        },
        suggestions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              category: { type: "string" },
              title: { type: "string" },
              description: { type: "string" },
              priority: {
                type: "string",
                enum: ["low", "medium", "high"],
              },
              actionType: {
                type: "string",
                enum: [
                  "lifestyle",
                  "diet",
                  "activity",
                  "medication",
                  "appointment",
                  "preventive",
                  "mental-wellness",
                ],
              },
            },
            required: [
              "id",
              "category",
              "title",
              "description",
              "priority",
              "actionType",
            ],
          },
        },
        riskAlerts: {
          type: "array",
          items: { type: "string" },
        },
        recommendedDepartment: { type: "string" },
        recommendedDoctorType: { type: "string" },
      },
      required: [
        "summary",
        "priority",
        "suggestions",
        "riskAlerts",
        "recommendedDepartment",
        "recommendedDoctorType",
      ],
    };

    const prompt = `
You are an AI hospital health suggestions assistant.

Your task:
1. Read the patient context.
2. Generate safe, helpful, non-alarming health suggestions.
3. Keep suggestions practical for a hospital management system UI.
4. Do not prescribe dangerous treatment.
5. Recommend doctor follow-up when needed.
6. Return JSON only.

Patient context:
${JSON.stringify(patientContext, null, 2)}
`;

    const response = await geminiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.4,
      },
    });

    console.log("Gemini full response:", response);

    const rawText = response.text;
    console.log("Gemini raw text:", rawText);

    if (!rawText || typeof rawText !== "string") {
      throw new Error("Gemini returned empty or invalid response text");
    }

    const cleanedText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    console.log("Gemini cleaned text:", cleanedText);

    const parsed = JSON.parse(cleanedText);

    return {
      summary: parsed?.summary || FALLBACK_RESPONSE.summary,
      priority: ["low", "medium", "high"].includes(parsed?.priority)
        ? parsed.priority
        : "medium",
      suggestions:
        Array.isArray(parsed?.suggestions) && parsed.suggestions.length > 0
          ? parsed.suggestions
          : FALLBACK_RESPONSE.suggestions,
      riskAlerts: Array.isArray(parsed?.riskAlerts)
        ? parsed.riskAlerts
        : FALLBACK_RESPONSE.riskAlerts,
      recommendedDepartment:
        parsed?.recommendedDepartment ||
        FALLBACK_RESPONSE.recommendedDepartment,
      recommendedDoctorType:
        parsed?.recommendedDoctorType ||
        FALLBACK_RESPONSE.recommendedDoctorType,
    };
  } catch (error) {
    console.error("Gemini Suggestions Service Error:", error);
    return FALLBACK_RESPONSE;
  }
};
