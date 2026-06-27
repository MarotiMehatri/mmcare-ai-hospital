
import express from "express";
import multer from "multer";
import path from "path";
import {
  analyzeMedicalReport,
  fetchPatientReportHistory,
  fetchSingleReportAnalysis,
} from "../controllers/reportAnalyzerController.js";
import {
  ensureDir,
  generateStoredFileName,
  isAllowedReportMimeType,
} from "../utils/fileHelpers.js";

const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads", "reports");
ensureDir(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, generateStoredFileName(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (isAllowedReportMimeType(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF and image files are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB local upload limit for your app
  },
});

router.post("/analyze", upload.single("reportFile"), analyzeMedicalReport);
router.get("/patient/:patientId", fetchPatientReportHistory);
router.get("/:id", fetchSingleReportAnalysis);

export default router;
