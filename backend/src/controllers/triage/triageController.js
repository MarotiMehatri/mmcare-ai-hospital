import { analyzeSymptomsWithGemini } from "../../services/triage/geminiTriageService.js";
import { applyEmergencyOverrides } from "../../services/triage/triageRuleEngine.js";
import { getRecommendedDoctors } from "../../services/triage/doctorRecommendationService.js";
import { sanitizeTriageInput } from "../../utils/triage/triageSanitizer.js";
import {
  addTriageRecord,
  getTriageHistoryByPatientId,
} from "../../utils/triage/triageHistoryStore.js";
import { sendError, sendSuccess } from "../../utils/triage/apiResponse.js";

export const analyzeTriage = async (req, res) => {
  res.set("Cache-Control", "no-store");

  try {
    const input = sanitizeTriageInput(req.body);

    if (!input.symptoms || !input.fullName || !input.age) {
      return sendError(res, "fullName, age and symptoms are required", 400);
    }

    const aiResult = await analyzeSymptomsWithGemini(input);
    const finalResult = applyEmergencyOverrides(input, aiResult);
    const recommendedDoctors = getRecommendedDoctors(
      finalResult.department,
      finalResult.specialization,
    );

    const record = {
      id: Date.now(),
      patientId: input.patientId || "guest",
      createdAt: new Date().toISOString(),
      input,
      result: finalResult,
      recommendedDoctors,
    };

    addTriageRecord(record);

    return sendSuccess(
      res,
      {
        ...finalResult,
        recommendedDoctors,
      },
      "Triage analysis completed",
    );
  } catch (error) {
    console.error("analyzeTriage error:", error);
    return sendError(res, "Failed to analyze triage", 500, {
      error: error.message,
    });
  }
};

export const getTriageHistory = async (req, res) => {
  res.set("Cache-Control", "private, no-cache");

  try {
    const { patientId } = req.params;

    if (!patientId) {
      return sendError(res, "patientId is required", 400);
    }

    const history = getTriageHistoryByPatientId(patientId);

    return sendSuccess(res, history, "Triage history fetched");
  } catch (error) {
    console.error("getTriageHistory error:", error);
    return sendError(res, "Failed to fetch triage history", 500, {
      error: error.message,
    });
  }
};
