import express from "express";

import {
  createDoctor,
  deleteDoctor,
  getDoctorByEmail,
  getDoctorById,
  getDoctors,
  loginDoctor,
  updateDoctor,
} from "../../controllers/Doctor/doctorController.js";

const router = express.Router();

// =====================================================
// DOCTOR LOGIN
// POST /api/doctors/login
//
// IMPORTANT:
// This route MUST be before /:id
// Otherwise "login" could be treated as an ID.
// =====================================================

router.post(
  "/login",
  loginDoctor,
);


// =====================================================
// GET DOCTOR BY EMAIL
// Must be BEFORE /:id
// =====================================================

router.get(
  "/email",
  getDoctorByEmail
);

// =====================================================
// GET ALL DOCTORS
// GET /api/doctors
// =====================================================

router.get(
  "/",
  getDoctors
);

// =====================================================
// GET DOCTOR BY ID
// GET /api/doctors/:id
// =====================================================

router.get(
  "/:id",
  getDoctorById
);

// =====================================================
// CREATE DOCTOR
// POST /api/doctors
// =====================================================

router.post(
  "/",
  createDoctor
);

// =====================================================
// UPDATE DOCTOR
// PUT /api/doctors/:id
// =====================================================

router.put(
  "/:id",
  updateDoctor
);

// =====================================================
// DELETE DOCTOR
// DELETE /api/doctors/:id
// =====================================================

router.delete(
  "/:id",
  deleteDoctor
);

export default router;