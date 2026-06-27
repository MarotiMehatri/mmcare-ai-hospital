import express from "express";
import {
  analyzeAIIntegration,
  getAIIntegrationConfig,
} from "../controllers/aiIntegrationController.js";

const router = express.Router();

router.get("/config", getAIIntegrationConfig);
router.post("/analyze", analyzeAIIntegration);

export default router;
