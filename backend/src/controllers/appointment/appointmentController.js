import mongoose from "mongoose";
import Appointment from "../../models/Appointment.model.js";

const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(String(value));
};

/**
 * Helper:
 * Find appointment using MongoDB _id OR application IDs.
 */
const findAppointmentByIdentifier = async (id) => {
  const value = String(id);

  // Try MongoDB _id first
  if (isValidObjectId(value)) {
    const appointment = await Appointment.findById(value);

    if (appointment) {
      return appointment;
    }
  }

  // Try application/legacy IDs
  return await Appointment.findOne({
    $or: [
      { id: value },
      { legacyId: value },
      { appointmentId: value },
    ],
  });
};

/**
 * GET /api/appointments
 *
 * Optional query parameters:
 * ?patientId=
 * ?doctorId=
 * ?appointmentDate=
 * ?appointmentTime=
 * ?status=
 */
export const getAppointments = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      status,
    } = req.query;

    const filter = {};

    if (patientId) {
      filter.patientId = String(patientId);
    }

    if (doctorId) {
      filter.doctorId = String(doctorId);
    }

    if (appointmentDate) {
      filter.appointmentDate = String(appointmentDate);
    }

    if (appointmentTime) {
      filter.appointmentTime = String(appointmentTime);
    }

    if (status) {
      filter.status = String(status);
    }

    console.log("GET APPOINTMENTS FILTER:", filter);

    const appointments = await Appointment.find(filter)
      .sort({
        appointmentDate: 1,
        appointmentTime: 1,
        createdAt: -1,
      })
      .lean();

    console.log(`Found ${appointments.length} appointments`);

    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error("GET APPOINTMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

/**
 * GET /api/appointments/:id
 */
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await findAppointmentByIdentifier(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error("GET APPOINTMENT BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch appointment",
      error: error.message,
    });
  }
};

/**
 * POST /api/appointments
 */
export const createAppointment = async (req, res) => {
  try {
    console.log("CREATE APPOINTMENT BODY:", req.body);

    const {
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
    } = req.body;

    // Required fields
    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "patientId is required",
      });
    }

    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "doctorId is required",
      });
    }

    if (!appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "appointmentDate is required",
      });
    }

    if (!appointmentTime) {
      return res.status(400).json({
        success: false,
        message: "appointmentTime is required",
      });
    }

    // Prevent duplicate booking
    const existingAppointment = await Appointment.findOne({
      patientId: String(patientId),
      doctorId: String(doctorId),
      appointmentDate: String(appointmentDate),
      appointmentTime: String(appointmentTime),
      status: {
        $nin: [
          "cancelled",
          "Cancelled",
          "CANCELLED",
        ],
      },
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "This appointment slot is already booked",
        data: existingAppointment,
      });
    }

    const generatedAppointmentId = `APT-${Date.now()}`;

    const appointmentData = {
      ...req.body,

      id: generatedAppointmentId,
      appointmentId: generatedAppointmentId,

      patientId: String(patientId),
      doctorId: String(doctorId),

      appointmentDate: String(appointmentDate),
      appointmentTime: String(appointmentTime),

      status: req.body.status || "pending",
    };

    const newAppointment = await Appointment.create(
      appointmentData
    );

    console.log(
      "APPOINTMENT CREATED:",
      newAppointment._id
    );

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: newAppointment,
    });
  } catch (error) {
    console.error("CREATE APPOINTMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

/**
 * PATCH /api/appointments/:id
 */
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await findAppointmentByIdentifier(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const nextDoctorId =
      req.body.doctorId ?? appointment.doctorId;

    const nextDate =
      req.body.appointmentDate ??
      appointment.appointmentDate;

    const nextTime =
      req.body.appointmentTime ??
      appointment.appointmentTime;

    // Prevent duplicate doctor slot
    const duplicate = await Appointment.findOne({
      _id: {
        $ne: appointment._id,
      },

      doctorId: String(nextDoctorId),
      appointmentDate: String(nextDate),
      appointmentTime: String(nextTime),

      status: {
        $nin: [
          "cancelled",
          "Cancelled",
          "CANCELLED",
        ],
      },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "This doctor slot is already booked",
      });
    }

    Object.assign(appointment, req.body);

    if (req.body.patientId) {
      appointment.patientId = String(
        req.body.patientId
      );
    }

    if (req.body.doctorId) {
      appointment.doctorId = String(
        req.body.doctorId
      );
    }

    if (req.body.appointmentDate) {
      appointment.appointmentDate = String(
        req.body.appointmentDate
      );
    }

    if (req.body.appointmentTime) {
      appointment.appointmentTime = String(
        req.body.appointmentTime
      );
    }

    await appointment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("UPDATE APPOINTMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update appointment",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/appointments/:id
 */
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment =
      await findAppointmentByIdentifier(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    await appointment.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("DELETE APPOINTMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete appointment",
      error: error.message,
    });
  }
};