import AISuggestion from "../../models/AISuggestion.model.js";

/*
|--------------------------------------------------------------------------
| GENERATE AI SUGGESTIONS
|--------------------------------------------------------------------------
*/

export const generateAISuggestions = async (
  req,
  res,
) => {
  try {
    const patient = req.body || {};

    const patientId =
      patient.id ||
      patient.patientId ||
      patient._id ||
      "";

    const patientName =
      patient.fullName ||
      patient.FullName ||
      patient.name ||
      "Patient";

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "patientId is required.",
      });
    }

    const suggestions = [
      {
        id: "SUG-1",
        category: "Lifestyle",
        title:
          "Maintain a balanced diet",
        description:
          "Eat more fruits, vegetables, whole grains, and drink enough water daily.",
        priority: "Medium",
      },

      {
        id: "SUG-2",
        category: "Exercise",
        title:
          "Do light physical activity",
        description:
          "Walk for 20–30 minutes daily unless your doctor advised rest.",
        priority: "Low",
      },

      {
        id: "SUG-3",
        category: "Medical",
        title:
          "Follow up with doctor",
        description:
          "Continue regular health checkups and follow prescribed medicines.",
        priority: "High",
      },
    ];

    const data =
      await AISuggestion.create({
        legacyId:
          `SUG-${Date.now()}`,

        patientId: String(patientId),

        patientName,

        summary:
          "Based on your health profile, here are personalized AI health suggestions.",

        priority: "Medium",

        suggestions,

        riskAlerts: [
          {
            id: "RISK-1",
            title:
              "Do not ignore severe symptoms",
            message:
              "If you have chest pain, breathing difficulty, fainting, or severe pain, contact a doctor immediately.",
            level: "High",
          },
        ],

        recommendedDepartment:
          patient.department ||
          "General Medicine",

        recommendedDoctorType:
          "General Physician",

        generatedAt: new Date(),
      });

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "❌ Generate AI Suggestions Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate AI suggestions.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET AI SUGGESTION HISTORY
|--------------------------------------------------------------------------
*/

export const getAISuggestionsByPatient =
  async (req, res) => {
    try {
      const { patientId } = req.params;

      const history =
        await AISuggestion.find({
          patientId: String(patientId),
        }).sort({
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        count: history.length,
        data: history,
      });
    } catch (error) {
      console.error(
        "❌ Get AI Suggestions Error:",
        error,
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load AI suggestions history.",
        error: error.message,
      });
    }
  };