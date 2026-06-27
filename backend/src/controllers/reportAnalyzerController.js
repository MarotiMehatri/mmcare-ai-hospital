import path from "path";
import fs from "fs/promises";
import { analyzeReportWithGemini } from "../services/geminiReportService.js";
import {
  saveReportAnalysis,
  getPatientReportHistory,
  getSingleReportAnalysis,
} from "../services/reportStorageService.js";
import { isAllowedReportMimeType, bytesToMB } from "../utils/fileHelpers.js";

export const analyzeMedicalReport = async (req, res, next) => {
  try {
    const file = req.file;
    const { patientId, reportType, notes } = req.body;

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "patientId is required.",
      });
    }

    if (!reportType) {
      return res.status(400).json({
        success: false,
        message: "reportType is required.",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Report file is required.",
      });
    }

    if (!isAllowedReportMimeType(file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only PDF, PNG, JPG, JPEG, and WEBP files are allowed.",
      });
    }

    const analysis = await analyzeReportWithGemini({
      storedFilePath: file.path,
      mimeType: file.mimetype,
      reportType,
      notes,
    });

    const savedRecord = await saveReportAnalysis({
      patientId,
      reportType,
      notes: notes || "",
      originalFileName: file.originalname,
      storedFilePath: file.path,
      mimeType: file.mimetype,
      fileSizeMB: bytesToMB(file.size),
      urgencyLevel: analysis.urgencyLevel,
      recommendedDepartment: analysis.recommendedDepartment,
      aiResponseJson: analysis,
    });

    return res.status(200).json({
      success: true,
      message: "Report analyzed successfully.",
      data: {
        ...analysis,
        reportId: savedRecord.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const fetchPatientReportHistory = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    const history = await getPatientReportHistory(patientId);

    const compactHistory = history.map((item) => ({
      id: item.id,
      patientId: item.patientId,
      originalFileName: item.originalFileName,
      reportType: item.reportType,
      mimeType: item.mimeType,
      urgencyLevel: item.urgencyLevel,
      recommendedDepartment: item.recommendedDepartment,
      createdAt: item.createdAt,
    }));

    return res.status(200).json({
      success: true,
      data: compactHistory,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchSingleReportAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await getSingleReportAnalysis(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report analysis not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};
