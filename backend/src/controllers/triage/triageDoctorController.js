import { getRecommendedDoctors } from "../../services/triage/doctorRecommendationService.js";
import { sendError, sendSuccess } from "../../utils/triage/apiResponse.js";

export const getDoctorsByRecommendation = (req, res) => {
  res.set("Cache-Control", "public, max-age=300");

  try {
    const { department = "", specialization = "" } = req.query;

    if (!department && !specialization) {
      return sendError(res, "department or specialization is required", 400);
    }

    const doctors = getRecommendedDoctors(department, specialization);

    return sendSuccess(res, doctors, "Recommended doctors fetched");
  } catch (error) {
    console.error("getDoctorsByRecommendation error:", error);
    return sendError(res, "Failed to fetch recommended doctors", 500, {
      error: error.message,
    });
  }
};
