import express from "express";
import multer from "multer";
import {
  getAppointmentRecommendation,
  getDoctorSlots,
  bookAppointment,
} from "../../controllers/aiAppointmentController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/appointment-recommendation", getAppointmentRecommendation);
router.get("/doctor-slots/:doctorId", getDoctorSlots);
router.post("/book-appointment", bookAppointment);
export default router;
