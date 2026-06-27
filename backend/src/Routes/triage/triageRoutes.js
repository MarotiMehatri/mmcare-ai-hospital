import express from "express";
import {
  analyzeTriage,
  getTriageHistory,
} from "../../controllers/triage/triageController.js";

const router = express.Router();

router.post("/analyze", analyzeTriage);
router.get("/history/:patientId", getTriageHistory);

export default router;
