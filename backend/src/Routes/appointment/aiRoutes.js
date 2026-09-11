import express from "express";


import {
  getAppointmentRecommendation,
  getDoctorSlots,
  bookAppointment,
} from "../../controllers/appointment/aiAppointmentController.js";

const router = express.Router();

router.post("/appointment-recommendation", getAppointmentRecommendation);
router.get("/doctor-slots/:doctorId", getDoctorSlots);
router.post("/book-appointment", bookAppointment);
export default router;
