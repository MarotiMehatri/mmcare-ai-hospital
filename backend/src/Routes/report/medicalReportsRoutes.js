import express from "express";

import uploadMedicalReport from "../../middleware/uploadMedicalReport.js";

import {
  getAllMedicalReports,
  getMedicalReportById,
  getMedicalReportsByPatientId,
  createMedicalReport,
  updateMedicalReport,
  deleteMedicalReport,
} from "../../controllers/report/medicalReportController.js";

const router = express.Router();

router.get("/", getAllMedicalReports);

router.get(
  "/patient/:patientId",
  getMedicalReportsByPatientId
);

router.get("/:id", getMedicalReportById);

router.post(
  "/",
  uploadMedicalReport.single("file"),
  createMedicalReport
);

/*
|--------------------------------------------------------------------------
| UPDATE MEDICAL REPORT - PATCH
|--------------------------------------------------------------------------
| PATCH /api/medical-reports/:id
|
| Used by AdminReportsPage to update only the status.
*/
router.patch(
  "/:id",
  uploadMedicalReport.single("file"),
  updateMedicalReport
);



router.put("/:id", uploadMedicalReport.single("file"), updateMedicalReport);

router.delete("/:id", deleteMedicalReport);

export default router;