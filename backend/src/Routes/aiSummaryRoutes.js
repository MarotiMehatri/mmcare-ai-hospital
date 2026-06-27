import express from "express";
import { getAISummary } from "../controllers/aiSummaryController.js";

const router = express.Router();

router.get("/summary", getAISummary);

export default router;
