import express from "express";
import {
  getPatients,
  getPatientById,
  getPatientByEmail,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

const router = express.Router();

/* =========================
   PATIENT ROUTES
========================= */

// Get all patients
router.get("/", getPatients);

// Get patient by ID
router.get("/:id", getPatientById);

// Get patient by email
router.get("/email", getPatientByEmail);

// Create patient
router.post("/", createPatient);

// Update patient
router.put("/:id", updatePatient);

// Delete patient
router.delete("/:id", deletePatient);

export default router;
