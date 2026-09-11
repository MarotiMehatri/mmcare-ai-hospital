import {
  getDoctorsByAIRecommendation,
  getDoctorById,
} from "../../services/appointment/doctorService.js";

import { getSlotsByDoctorId } from "../../services/appointment/slotService.js";

import Appointment from "../../models/Appointment.model.js";

/*
|--------------------------------------------------------------------------
| GET AI APPOINTMENT RECOMMENDATION
|--------------------------------------------------------------------------
*/

export const getAppointmentRecommendation = async (req, res) => {
  try {
    console.log("🤖 appointment-recommendation hit");

    const {
      city = "",
      symptoms = "",
      department,
      specialization,
      visitType = "offline",
      urgency = "medium",
      reason = "",
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Temporary AI recommendation
    |
    | Later this can be replaced with Gemini.
    |--------------------------------------------------------------------------
    */

    const aiRecommendation = {
      department: department || "General Medicine",
      specialization: specialization || "General Physician",
      urgency,
      visitType,
      reason:
        reason ||
        "Based on the provided symptoms and health information.",
      preparation:
        "Drink enough water and bring previous prescriptions and medical reports.",
      emergency: urgency === "high",
    };

    /*
    |--------------------------------------------------------------------------
    | Find matching doctors from MongoDB
    |--------------------------------------------------------------------------
    */

    const matchedDoctors =
      await getDoctorsByAIRecommendation({
        department: aiRecommendation.department,
        specialization: aiRecommendation.specialization,
        visitType: aiRecommendation.visitType,
        city,
      });

    /*
    |--------------------------------------------------------------------------
    | Add available slots
    |--------------------------------------------------------------------------
    */

    const doctorsWithSlots = await Promise.all(
      matchedDoctors.map(async (doctor) => {
        const doctorId =
          doctor._id || doctor.id;

        const slots =
          await getSlotsByDoctorId(doctorId);

        return {
          ...doctor,
          availableSlots: slots || [],
        };
      }),
    );

    return res.status(200).json({
      success: true,
      aiRecommendation,
      doctors: doctorsWithSlots,
    });
  } catch (error) {
    console.error(
      "❌ Appointment Recommendation Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate appointment recommendation.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET DOCTOR SLOTS
|--------------------------------------------------------------------------
*/

export const getDoctorSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;

    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "doctorId is required.",
      });
    }

    const doctor =
      await getDoctorById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const slots =
      await getSlotsByDoctorId(doctorId);

    return res.status(200).json({
      success: true,
      doctor,
      slots: slots || [],
    });
  } catch (error) {
    console.error(
      "❌ Doctor Slots Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch doctor slots.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| BOOK APPOINTMENT
|--------------------------------------------------------------------------
|
| IMPORTANT:
| This now saves the appointment into MongoDB.
|
*/

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
      reason,
      consultationMode,
    } = req.body;

    if (
      !patientId ||
      !doctorId ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        success: false,
        message:
          "patientId, doctorId, date and time are required.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Check doctor
    |--------------------------------------------------------------------------
    */

    const doctor =
      await getDoctorById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Prevent duplicate appointment
    |--------------------------------------------------------------------------
    */

    const existingAppointment =
      await Appointment.findOne({
        doctorId: String(doctorId),
        date: String(date),
        time: String(time),
        status: {
          $nin: [
            "CANCELLED",
            "Cancelled",
          ],
        },
      });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message:
          "This appointment slot is already booked.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Generate appointment ID
    |--------------------------------------------------------------------------
    */

    const appointmentId =
      `APT-${Date.now()}`;

    /*
    |--------------------------------------------------------------------------
    | Save MongoDB document
    |--------------------------------------------------------------------------
    */

    const appointment =
      await Appointment.create({
        appointmentId,

        patientId: String(patientId),

        doctorId: String(doctorId),

        patient: {
          id: String(patientId),
        },

        doctor: {
          id: String(
            doctor._id || doctor.id || doctorId,
          ),
          name:
            doctorName ||
            doctor.FullName ||
            doctor.name ||
            "",
        },

        department:
          department ||
          doctor.department ||
          "",

        date: String(date),

        time: String(time),

        appointmentDate: String(date),

        appointmentTime: String(time),

        reason: reason || "",

        symptoms: symptoms || "",

        consultationMode:
          consultationMode ||
          visitType ||
          "offline",

        status: "Confirmed",

        consultationFee:
          Number(fee) || 0,

        notes: "",
      });

    return res.status(201).json({
      success: true,
      message:
        "Appointment booked successfully.",
      data: appointment,
    });
  } catch (error) {
    console.error(
      "❌ Book Appointment Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to book appointment.",
      error: error.message,
    });
  }
};