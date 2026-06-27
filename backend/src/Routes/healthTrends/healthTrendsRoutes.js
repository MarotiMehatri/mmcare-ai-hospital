import express from "express";
import {
  getPatientHealthTrends,
  addPatientHealthRecord,
} from "../../controllers/healthTrends/healthTrendsController.js";

const router = express.Router();

router.get("/patient/:patientId", getPatientHealthTrends);
router.post("/patient/:patientId", addPatientHealthRecord);

export default router;
