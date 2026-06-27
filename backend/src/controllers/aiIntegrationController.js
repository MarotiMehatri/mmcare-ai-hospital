import { sanitizeAIInput } from "../utils/integration/sanitizeAIInput.js";
import {
  setNoStore,
  setShortPublicCache,
} from "../utils/integration/cacheHeaders.js";
import { generateAIIntegrationResult } from "../services/geminiIntegrationService.js";

export const analyzeAIIntegration = async (req, res) => {
  setNoStore(res);

  try {
    const sanitizedInput = sanitizeAIInput(req.body);

    if (!sanitizedInput.symptoms && !sanitizedInput.question) {
      return res.status(400).json({
        success: false,
        message: "Please provide symptoms or a question.",
      });
    }

    const result = await generateAIIntegrationResult(sanitizedInput);

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("AI Integration Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response.",
      error: error.message,
    });
  }
};

export const getAIIntegrationConfig = (req, res) => {
  setShortPublicCache(res);

  return res.status(200).json({
    success: true,
    data: {
      urgencyLevels: ["low", "medium", "high"],
      departments: [
        "General Medicine",
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "Pulmonology",
        "Dermatology",
        "Gastroenterology",
      ],
      quickActions: [
        "Suggest department",
        "Check urgency",
        "Give precautions",
        "Recommend specialist",
      ],
    },
  });
};
