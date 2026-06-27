// routes/reportRoutes.js

import express from "express";
import {
  getReports,
  getReportById,
  createReport,
  deleteReport,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/", getReports);
router.get("/:id", getReportById);
router.post("/", createReport);
router.delete("/:id", deleteReport);

export default router;
