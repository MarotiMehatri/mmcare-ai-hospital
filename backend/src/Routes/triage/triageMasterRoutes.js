import express from "express";
import { getSymptomMaster } from "../../controllers/triage/triageMasterController.js";

const router = express.Router();

router.get("/symptoms", getSymptomMaster);

export default router;
