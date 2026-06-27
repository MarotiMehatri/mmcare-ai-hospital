import { symptomMaster } from "../../data/triage/symptomMaster.js";
import { sendSuccess } from "../../utils/triage/apiResponse.js";

export const getSymptomMaster = (req, res) => {
  res.set("Cache-Control", "public, max-age=1800");
  return sendSuccess(res, symptomMaster, "Symptom master fetched");
};
