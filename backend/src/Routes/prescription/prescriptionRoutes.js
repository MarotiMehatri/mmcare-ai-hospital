import express from "express";

import {
  createPrescription,
  getPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
} from "../../controllers/prescription/prescriptionController.js";

const router = express.Router();

/**
 * GET /api/prescriptions
 */
router.get("/", getPrescriptions);

/**
 * GET /api/prescriptions/:id
 */
router.get("/:id", getPrescriptionById);

/**
 * POST /api/prescriptions
 */
router.post("/", createPrescription);

/**
 * PATCH /api/prescriptions/:id
 */
router.patch("/:id", updatePrescription);

/**
 * DELETE /api/prescriptions/:id
 */
router.delete("/:id", deletePrescription);

export default router;