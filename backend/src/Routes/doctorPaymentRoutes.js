import express from "express";
import {
  createDoctorPayment,
  getDoctorPayments,
  updateDoctorPayment,
} from "../controllers/doctorPaymentController.js";

const router = express.Router();

router.get("/", getDoctorPayments);
router.post("/", createDoctorPayment);
router.patch("/:id", updateDoctorPayment);
router.put("/:id", updateDoctorPayment);

export default router;
