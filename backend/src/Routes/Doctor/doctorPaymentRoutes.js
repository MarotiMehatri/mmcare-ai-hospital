import { Router } from "express";

import {
  getDoctorPayments,
  getDoctorPaymentById,
  createDoctorPayment,
  updateDoctorPayment,
  deleteDoctorPayment,
} from "../../controllers/Doctor/doctorPaymentController.js";

const router = Router();

/* =========================================================
   DOCTOR PAYMENT ROUTES
   ========================================================= */

router.get("/", getDoctorPayments);

router.get("/:id", getDoctorPaymentById);

router.post("/", createDoctorPayment);

router.patch("/:id", updateDoctorPayment);

router.put("/:id", updateDoctorPayment);

router.delete("/:id", deleteDoctorPayment);

export default router;