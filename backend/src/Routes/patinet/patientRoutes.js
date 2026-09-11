
import express from "express";

import {
  getPatients,
  getPatientById,
  getPatientByEmail,
  getPatientByUserId,
  createPatient,
  updatePatient,
  deletePatient,
} from "../../controllers/patient/patientController.js";

const router = express.Router();

// GET /api/patients
router.get("/", getPatients);

// GET /api/patients/email?email=example@gmail.com
router.get("/email", getPatientByEmail);

// GET /api/patients/user/:userId
router.get("/user/:userId", getPatientByUserId);

// GET /api/patients/:id
router.get("/:id", getPatientById);

// POST /api/patients
router.post("/", createPatient);

// PUT /api/patients/:id
router.put("/:id", updatePatient);

// DELETE /api/patients/:id
router.delete("/:id", deletePatient);

export default router;
