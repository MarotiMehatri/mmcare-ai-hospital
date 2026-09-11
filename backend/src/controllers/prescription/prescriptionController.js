import mongoose from "mongoose";
import Prescription from "../../models/Prescription.model.js";

/**
 * Convert MongoDB/ObjectId values to strings when needed.
 */
const normalizeId = (value) => {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "object" && value._id) {
    return String(value._id);
  }

  return String(value);
};

/**
 * Find prescription using MongoDB _id, id,
 * prescriptionId, or legacyId.
 */
const findPrescriptionByIdentifier = async (identifier) => {
  if (!identifier) {
    return null;
  }

  const value = String(identifier);

  // First try MongoDB _id
  if (mongoose.Types.ObjectId.isValid(value)) {
    const prescription = await Prescription.findById(value).lean();

    if (prescription) {
      return prescription;
    }
  }

  // Then try application IDs
  return Prescription.findOne({
    $or: [
      { id: value },
      { prescriptionId: value },
      { legacyId: value },
    ],
  }).lean();
};

/**
 * GET /api/prescriptions
 *
 * Optional:
 * ?patientId=...
 * ?doctorId=...
 * ?appointmentId=...
 * ?status=...
 */
export const getPrescriptions = async (req, res) => {
  try {
    const filter = {};

    if (req.query.patientId) {
      filter.patientId = req.query.patientId;
    }

    if (req.query.doctorId) {
      filter.doctorId = req.query.doctorId;
    }

    if (req.query.appointmentId) {
      filter.appointmentId = req.query.appointmentId;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    console.log("GET /api/prescriptions");
    console.log("Prescription filter:", filter);

    const prescriptions = await Prescription.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    console.log(
      `Found ${prescriptions.length} prescription(s)`,
    );

    return res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    console.error("Get prescriptions error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch prescriptions",
      error: error.message,
    });
  }
};

/**
 * GET /api/prescriptions/:id
 */
export const getPrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;

    const prescription = await findPrescriptionByIdentifier(id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: prescription,
    });
  } catch (error) {
    console.error("Get prescription by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch prescription",
      error: error.message,
    });
  }
};

/**
 * POST /api/prescriptions
 */
export const createPrescription = async (req, res) => {
  try {
    console.log("====================================");
    console.log("CREATE PRESCRIPTION REQUEST");
    console.log("====================================");
    console.log("Request body:", req.body);

    const body = req.body || {};

    /**
     * Basic validation
     */
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

    /**
     * Generate application-level prescription ID.
     *
     * Example:
     * PRES-1725688123456
     */
    const generatedId =
      body.id ||
      body.prescriptionId ||
      `PRES-${Date.now()}`;

    /**
     * Build MongoDB document.
     *
     * strict:false in your schema allows additional
     * frontend fields to be stored as well.
     */
    const prescriptionData = {
      ...body,

      id: String(generatedId),

      prescriptionId:
        body.prescriptionId ||
        String(generatedId),

      createdAt:
        body.createdAt ||
        new Date(),

      status:
        body.status ||
        "Active",
    };

    /**
     * Remove undefined values.
     */
    Object.keys(prescriptionData).forEach((key) => {
      if (prescriptionData[key] === undefined) {
        delete prescriptionData[key];
      }
    });

    /**
     * Create MongoDB document
     */
    const newPrescription =
      await Prescription.create(prescriptionData);

    console.log(
      "Prescription created successfully:",
      newPrescription._id.toString(),
    );

    return res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      data: newPrescription,
    });
  } catch (error) {
    console.error("====================================");
    console.error("CREATE PRESCRIPTION ERROR");
    console.error("====================================");
    console.error(error);

    /**
     * Duplicate key error
     */
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Prescription ID already exists",
        error: error.message,
      });
    }

    /**
     * Mongoose validation error
     */
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid prescription data",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create prescription",
      error: error.message,
    });
  }
};

/**
 * PATCH /api/prescriptions/:id
 */
export const updatePrescription = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(
      "Updating prescription:",
      id,
    );

    let prescription;

    /**
     * If ID is a valid MongoDB ObjectId,
     * update using _id.
     */
    if (mongoose.Types.ObjectId.isValid(id)) {
      prescription = await Prescription.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        {
          new: true,
          runValidators: true,
        },
      ).lean();
    }

    /**
     * If not found, try application IDs.
     */
    if (!prescription) {
      prescription =
        await Prescription.findOneAndUpdate(
          {
            $or: [
              { id: String(id) },
              { prescriptionId: String(id) },
              { legacyId: String(id) },
            ],
          },
          {
            $set: req.body,
          },
          {
            new: true,
            runValidators: true,
          },
        ).lean();
    }

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Prescription updated successfully",
      data: prescription,
    });
  } catch (error) {
    console.error(
      "Update prescription error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update prescription",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/prescriptions/:id
 */
export const deletePrescription = async (req, res) => {
  try {
    const { id } = req.params;

    let prescription;

    /**
     * Try MongoDB _id first.
     */
    if (mongoose.Types.ObjectId.isValid(id)) {
      prescription =
        await Prescription.findByIdAndDelete(id);
    }

    /**
     * Try application IDs if not found.
     */
    if (!prescription) {
      prescription =
        await Prescription.findOneAndDelete({
          $or: [
            { id: String(id) },
            { prescriptionId: String(id) },
            { legacyId: String(id) },
          ],
        });
    }

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Prescription deleted successfully",
      data: prescription,
    });
  } catch (error) {
    console.error(
      "Delete prescription error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete prescription",
      error: error.message,
    });
  }
};