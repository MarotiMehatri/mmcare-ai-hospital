import { generateDetailedChatReply } from "../../services/chat/geminiChatService.js";

export const handleAIChat = async (req, res) => {
  res.set("Cache-Control", "no-store");

  try {
    const { patient, message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const reply = await generateDetailedChatReply({
      patient: patient || {},
      message: message.trim(),
    });

    return res.status(200).json({
      success: true,
      data: reply,
    });
  } catch (error) {
    console.error("AI Chat Controller Error:", error.message);

    return res.status(200).json({
      success: true,
      data: {
        title: "AI Health Guidance",
        overview:
          "We could not fully process your question, but basic guidance is available. Please monitor your symptoms and consult a doctor if symptoms persist or worsen.",
        possibleCauses: ["General illness", "Temporary symptoms"],
        precautions: ["Rest well", "Stay hydrated", "Monitor your symptoms"],
        homeCare: ["Take proper rest", "Drink fluids", "Avoid overexertion"],
        whenToConsultDoctor: [
          "If symptoms continue",
          "If symptoms worsen",
          "If new symptoms appear",
        ],
        emergencySigns: [
          "Difficulty breathing",
          "Chest pain",
          "Loss of consciousness",
        ],
        recommendedDepartment: "General Medicine",
        recommendedSpecialist: "General Physician",
        nextSteps: ["Monitor your symptoms", "Consult a doctor if needed"],
        disclaimer:
          "This is AI-generated guidance and not a final medical diagnosis.",
      },
    });
  }
};
