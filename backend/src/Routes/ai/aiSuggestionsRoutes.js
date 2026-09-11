import express from "express";

import {
  generateAISuggestions,
  getAISuggestionsByPatient,
} from "../../controllers/ai/aiSuggestionsController.js";

const router = express.Router();

router.post(
  "/generate",
  generateAISuggestions,
);

router.get(
  "/patient/:patientId",
  getAISuggestionsByPatient,
);

export default router;