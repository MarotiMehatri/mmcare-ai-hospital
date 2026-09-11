import Patient from "../../models/Patient.model.js";
import Doctor from "../../models/Doctor.model.js";
import Appointment from "../../models/Appointment.model.js";
import Billing from "../../models/Billing.model.js";
import Prescription from "../../models/Prescription.model.js";

export const getAISummary = async (
  req,
  res,
) => {
  try {
    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalBills,
      totalPrescriptions,
    ] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Appointment.countDocuments(),
      Billing.countDocuments(),
      Prescription.countDocuments(),
    ]);

    const bills =
      await Billing.find().lean();

    const totalRevenue =
      bills.reduce(
        (sum, bill) =>
          sum +
          Number(
            bill.totalAmount ??
              bill.amount ??
              0,
          ),
        0,
      );

    const paidRevenue =
      bills
        .filter(
          (bill) =>
            String(
              bill.paymentStatus ||
                bill.status ||
                "",
            ).toUpperCase() === "PAID",
        )
        .reduce(
          (sum, bill) =>
            sum +
            Number(
              bill.totalAmount ??
                bill.amount ??
                0,
            ),
          0,
        );

    const pendingRevenue =
      bills
        .filter(
          (bill) =>
            String(
              bill.paymentStatus ||
                bill.status ||
                "",
            ).toUpperCase() === "PENDING",
        )
        .reduce(
          (sum, bill) =>
            sum +
            Number(
              bill.totalAmount ??
                bill.amount ??
                0,
            ),
          0,
        );

    const [
      completedAppointments,
      pendingAppointments,
      cancelledAppointments,
    ] = await Promise.all([
      Appointment.countDocuments({
        status: {
          $in: [
            "COMPLETED",
            "Completed",
          ],
        },
      }),

      Appointment.countDocuments({
        status: {
          $in: [
            "PENDING",
            "Pending",
          ],
        },
      }),

      Appointment.countDocuments({
        status: {
          $in: [
            "CANCELLED",
            "Cancelled",
          ],
        },
      }),
    ]);

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
        totalPatients > 50
          ? "Patient load is high"
          : "Normal patient flow",

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
      message:
        "AI Summary generated successfully.",
      data,
    });
  } catch (error) {
    console.error(
      "❌ AI Summary Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate AI summary.",
      error: error.message,
    });
  }
};