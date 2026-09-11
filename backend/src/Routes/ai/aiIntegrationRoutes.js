import express from "express";

import {
  analyzeAIIntegration,
  getAIIntegrationConfig,
} from "../../controllers/ai/aiIntegrationController.js";

const router = express.Router();

router.get(
  "/config",
  getAIIntegrationConfig,
);

router.post(
  "/analyze",
  analyzeAIIntegration,
);

export default router;