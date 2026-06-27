import express from "express";
import { getDoctorsByRecommendation } from "../../controllers/triage/triageDoctorController.js";

const router = express.Router();

router.get("/recommended", getDoctorsByRecommendation);

export default router;
