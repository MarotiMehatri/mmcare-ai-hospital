import express from "express";

import {
  createAIMemory,
  getAllAIMemory,
  getAIMemoryByPatient,
  getAIMemorySummary,
} from "../controllers/aiMemoryController.js";

const router = express.Router();

router.get("/", getAllAIMemory);
router.post("/", createAIMemory);
router.get("/patient/:patientId", getAIMemoryByPatient);
router.get("/summary/:patientId", getAIMemorySummary);

export default router;
