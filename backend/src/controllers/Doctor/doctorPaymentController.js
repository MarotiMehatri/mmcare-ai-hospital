import mongoose from "mongoose";
import DoctorPayment from "../../models/doctorPayment.model.js";

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const buildIdFilter = (id) => {
  const value = String(id);

  const filters = [
    { paymentId: value },
    { id: value },
    { legacyId: value },
  ];

  if (isValidObjectId(id)) {
    filters.push({ _id: id });
  }

  return {
    $or: filters,
  };
};

/* =========================================================
   GET ALL DOCTOR PAYMENTS
   GET /api/doctorPayments
   ========================================================= */

export const getDoctorPayments = async (req, res) => {
  try {
    const filter = {};

    if (req.query.doctorId) {
      filter.doctorId = String(req.query.doctorId);
    }

    if (req.query.patientId) {
      filter.patientId = String(req.query.patientId);
    }

    if (req.query.paymentStatus) {
      filter.paymentStatus = req.query.paymentStatus;
    }

    const payments = await DoctorPayment.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    console.error("GET DOCTOR PAYMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch doctor payments",
      error: error.message,
    });
  }
};

/* =========================================================
   GET PAYMENT BY ID
   GET /api/doctorPayments/:id
   ========================================================= */

export const getDoctorPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await DoctorPayment
      .findOne(buildIdFilter(id))
      .lean();

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Doctor payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error("GET DOCTOR PAYMENT BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch doctor payment",
      error: error.message,
    });
  }
};

/* =========================================================
   CREATE PAYMENT
   POST /api/doctorPayments
   ========================================================= */

export const createDoctorPayment = async (req, res) => {
  try {
    const body = req.body || {};

    console.log("CREATE DOCTOR PAYMENT REQUEST:");
    console.log(JSON.stringify(body, null, 2));

    if (!body.patientId) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required",
      });
    }

    if (!body.doctorId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    const paymentId =
      body.paymentId ||
      `PAY-${Date.now()}`;

    const existingPayment = await DoctorPayment
      .findOne({ paymentId })
      .lean();

    if (existingPayment) {
      return res.status(409).json({
        success: false,
        message: "Payment ID already exists",
      });
    }

    const medicines = Array.isArray(body.medicines)
      ? body.medicines
      : [];

    const tests = Array.isArray(body.tests)
      ? body.tests
      : [];

    const consultationFee =
      Number(body.consultationFee) || 0;

    const medicalBill =
      Number(body.medicalBill) ||
      medicines.reduce(
        (sum, medicine) =>
          sum +
          Number(medicine.quantity || 1) *
            Number(medicine.price || 0),
        0
      );

    const testBill =
      Number(body.testBill) ||
      tests.reduce(
        (sum, test) =>
          sum +
          Number(test.quantity || 1) *
            Number(test.price || 0),
        0
      );

    const totalAmount =
      Number(body.totalAmount) ||
      consultationFee +
        medicalBill +
        testBill;

    const created = await DoctorPayment.create({
      ...body,

      paymentId,

      id: body.id || paymentId,

      patientId:
        body.patientId != null
          ? String(body.patientId)
          : null,

      doctorId:
        body.doctorId != null
          ? String(body.doctorId)
          : null,

      appointmentId:
        body.appointmentId != null
          ? String(body.appointmentId)
          : null,

      prescriptionId:
        body.prescriptionId != null
          ? String(body.prescriptionId)
          : null,

      medicines,

      tests,

      consultationFee,

      medicalBill,

      testBill,

      totalAmount,

      paymentStatus:
        body.paymentStatus || "Pending",

      paymentDate:
        body.paymentDate ||
        new Date().toISOString().split("T")[0],

      paidDate:
        body.paymentStatus === "Paid"
          ? body.paidDate ||
            new Date().toISOString().split("T")[0]
          : body.paidDate || "",
    });

    return res.status(201).json({
      success: true,
      message: "Doctor payment created successfully",
      data: created,
    });
  } catch (error) {
    console.error("CREATE DOCTOR PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create doctor payment",
      error: error.message,
    });
  }
};

/* =========================================================
   UPDATE PAYMENT
   PATCH /api/doctorPayments/:id
   ========================================================= */

export const updateDoctorPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPayment = await DoctorPayment.findOneAndUpdate(
      buildIdFilter(id),
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedPayment) {
      return res.status(404).json({
        success: false,
        message: "Doctor payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor payment updated successfully",
      data: updatedPayment,
    });
  } catch (error) {
    console.error("UPDATE DOCTOR PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update doctor payment",
      error: error.message,
    });
  }
};

/* =========================================================
   DELETE PAYMENT
   DELETE /api/doctorPayments/:id
   ========================================================= */

export const deleteDoctorPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPayment =
      await DoctorPayment.findOneAndDelete(
        buildIdFilter(id)
      ).lean();

    if (!deletedPayment) {
      return res.status(404).json({
        success: false,
        message: "Doctor payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor payment deleted successfully",
      data: deletedPayment,
    });
  } catch (error) {
    console.error("DELETE DOCTOR PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete doctor payment",
      error: error.message,
    });
  }
};