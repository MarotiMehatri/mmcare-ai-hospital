import express from "express";

import {
  getAllMedicalReports,
  uploadMedicalReport,
  updateMedicalReport,
  deleteMedicalReport,
} from "../controllers/medicalReportController.js";

const router = express.Router();

router.get("/", getAllMedicalReports);
router.post("/", uploadMedicalReport);
router.put("/:id", updateMedicalReport);
router.delete("/:id", deleteMedicalReport);

export default router;
