import express from "express";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/", getAppointments);
router.post("/", createAppointment);
router.patch("/:id", updateAppointment);

export default router;
