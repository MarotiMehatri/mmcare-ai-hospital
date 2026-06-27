import express from "express";

import {
  generateAISuggestions,
  getAISuggestionsByPatient,
} from "../controllers/aiSuggestionsController.js";

const router = express.Router();

router.post("/generate", generateAISuggestions);
router.get("/patient/:patientId", getAISuggestionsByPatient);

export default router;
