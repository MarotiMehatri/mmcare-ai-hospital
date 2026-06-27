import {
  getDoctorsByAIRecommendation,
  getDoctorById,
} from "../services/appointment/doctorService.js";
import { getSlotsByDoctorId } from "../services/appointment/slotService.js";

export const getAppointmentRecommendation = async (req, res) => {
  try {
    console.log("appointment-recommendation hit");

    const aiRecommendation = {
      department: "General Medicine",
      specialization: "General Physician",
      urgency: "medium",
      visitType: "offline",
      reason: "Test response from backend",
      preparation: "Drink water and bring old prescriptions",
      emergency: false,
    };

    const matchedDoctors = await getDoctorsByAIRecommendation({
      department: aiRecommendation.department,
      specialization: aiRecommendation.specialization,
      visitType: aiRecommendation.visitType,
      city: req.body.city,
    });

    const doctorsWithSlots = matchedDoctors.map((doctor) => ({
      ...doctor,
      availableSlots: getSlotsByDoctorId(doctor.id),
    }));

    return res.status(200).json({
      success: true,
      aiRecommendation,
      doctors: doctorsWithSlots,
    });
  } catch (error) {
    console.error("Test Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDoctorSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await getDoctorById(doctorId);
    const slots = getSlotsByDoctorId(doctorId);

    return res.status(200).json({
      success: true,
      doctor,
      slots,
    });
  } catch (error) {
    console.error("Doctor Slots Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      doctorName,
      department,
      date,
      time,
      visitType,
      symptoms,
      urgency,
      fee,
    } = req.body;

    if (!patientId || !doctorId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "patientId, doctorId, date, time are required",
      });
    }

    const appointmentId = "APT" + Math.floor(100000 + Math.random() * 900000);

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: {
        appointmentId,
        patientId,
        doctorId,
        doctorName,
        department,
        date,
        time,
        visitType,
        symptoms,
        urgency,
        fee,
        status: "Confirmed",
      },
    });
  } catch (error) {
    console.error("Book Appointment Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
