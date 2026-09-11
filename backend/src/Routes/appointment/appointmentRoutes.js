import express from "express";

import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../../controllers/appointment/appointmentController.js";

const router = express.Router();

router.get("/", getAppointments);

router.get("/:id", getAppointmentById);

router.post("/", createAppointment);

router.patch("/:id", updateAppointment);

router.delete("/:id", deleteAppointment);

export default router;