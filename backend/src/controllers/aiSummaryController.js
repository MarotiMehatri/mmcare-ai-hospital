import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import Billing from "../models/Billing.js";
import Prescription from "../models/Prescription.js";

export const getAISummary = async (req, res) => {
  try {
    // =========================
    // Count data safely
    // =========================
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalBills = await Billing.countDocuments();
    const totalPrescriptions = await Prescription.countDocuments();

    // =========================
    // Revenue calculation
    // =========================
    const bills = await Billing.find();

    const totalRevenue = bills.reduce((sum, b) => sum + (b.amount || 0), 0);

    const paidRevenue = bills
      .filter((b) => b.status === "PAID")
      .reduce((sum, b) => sum + (b.amount || 0), 0);

    const pendingRevenue = bills
      .filter((b) => b.status === "PENDING")
      .reduce((sum, b) => sum + (b.amount || 0), 0);

    // =========================
    // Appointment stats
    // =========================
    const completedAppointments = await Appointment.countDocuments({
      status: "COMPLETED",
    });

    const pendingAppointments = await Appointment.countDocuments({
      status: "PENDING",
    });

    const cancelledAppointments = await Appointment.countDocuments({
      status: "CANCELLED",
    });

    // =========================
    // AI Summary Response
    // =========================
    const data = {
      overview: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        totalBills,
        totalPrescriptions,
      },

      revenue: {
        totalRevenue,
        paidRevenue,
        pendingRevenue,
      },

      appointments: {
        completedAppointments,
        pendingAppointments,
        cancelledAppointments,
      },

      insights: [
        totalPatients > 50 ? "Patient load is high" : "Normal patient flow",

        pendingAppointments > 10
          ? "High pending appointments need attention"
          : "Appointments are under control",

        paidRevenue > pendingRevenue
          ? "Revenue collection is healthy"
          : "Improve billing collection",
      ],
    };

    return res.status(200).json({
      success: true,
      message: "AI Summary generated successfully",
      data,
    });
  } catch (error) {
    console.error("AI Summary Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI summary",
      error: error.message,
    });
  }
};
