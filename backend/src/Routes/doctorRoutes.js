import express from "express";
import {
  createDoctor,
  deleteDoctor,
  getDoctorByEmail,
  getDoctorById,
  getDoctors,
  updateDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

// Get doctor by email — must be before /:id
router.get("/email", getDoctorByEmail);

// Get all doctors
router.get("/", getDoctors);

// Get doctor by ID — keep after fixed routes
router.get("/:id", getDoctorById);

// Create doctor
router.post("/", createDoctor);

// Update doctor
router.put("/:id", updateDoctor);

// Delete doctor
router.delete("/:id", deleteDoctor);

export default router;
