
import mongoose from "mongoose";
import Patient from "../../models/Patient.model.js";

/* GET ALL / FILTER PATIENTS */
export const getPatients = async (req, res) => {
  try {
    const filter = {};

    if (req.query.userId) {
      const userId = String(req.query.userId);

      if (mongoose.Types.ObjectId.isValid(userId)) {
        filter.userId = userId;
      } else {
        filter.$or = [
          { userId: userId },
          { legacyId: userId },
          { id: userId },
        ];
      }
    }

    if (req.query.patientID) {
      filter.patientId = String(req.query.patientID);
    }

    if (req.query.email) {
      filter.email = req.query.email.trim().toLowerCase();
    }

    const patients = await Patient.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    console.error("❌ Get patients error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch patients",
      error: error.message,
    });
  }
};

/* GET PATIENT BY ID */
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    let patient = null;

    // MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      patient = await Patient.findById(id);
    }

    // Legacy JSON id
    if (!patient) {
      patient = await Patient.findOne({
        $or: [
          { legacyId: String(id) },
          { id: String(id) },
          { patientId: String(id) },
        ],
      });
    }

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("❌ Get patient by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch patient",
      error: error.message,
    });
  }
};

/* GET PATIENT BY EMAIL */
export const getPatientByEmail = async (req, res) => {
  try {
    const email = req.query.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const patients = await Patient.find({ email }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    console.error("❌ Get patient by email error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch patient",
      error: error.message,
    });
  }
};

/* GET PATIENT BY USER ID */
export const getPatientByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    let patient = null;

    // MongoDB User _id
    if (mongoose.Types.ObjectId.isValid(userId)) {
      patient = await Patient.findOne({
        userId,
      });
    }

    // Legacy user id
    if (!patient) {
      patient = await Patient.findOne({
        $or: [
          { legacyId: String(userId) },
          { id: String(userId) },
        ],
      });
    }

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("❌ Get patient by userId error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch patient",
      error: error.message,
    });
  }
};

/* CREATE PATIENT */
export const createPatient = async (req, res) => {
  try {
    const patientData = {
      ...req.body,
    };

    if (patientData.email) {
      patientData.email = patientData.email.trim().toLowerCase();
    }

    const patient = await Patient.create(patientData);

    return res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: patient,
    });
  } catch (error) {
    console.error("❌ Create patient error:", error);

    return res.status(400).json({
      success: false,
      message: "Failed to create patient",
      error: error.message,
    });
  }
};

/* UPDATE PATIENT */
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    let patient = null;

    const updateData = {
      ...req.body,
    };

    if (updateData.email) {
      updateData.email = updateData.email.trim().toLowerCase();
    }

    // MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      patient = await Patient.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );
    }

    // Legacy ID
    if (!patient) {
      patient = await Patient.findOneAndUpdate(
        {
          $or: [
            { legacyId: String(id) },
            { id: String(id) },
            { patientId: String(id) },
          ],
        },
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );
    }

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: patient,
    });
  } catch (error) {
    console.error("❌ Update patient error:", error);

    return res.status(400).json({
      success: false,
      message: "Failed to update patient",
      error: error.message,
    });
  }
};

/* DELETE PATIENT */
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    let patient = null;

    // MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      patient = await Patient.findByIdAndDelete(id);
    }

    // Legacy ID
    if (!patient) {
      patient = await Patient.findOneAndDelete({
        $or: [
          { legacyId: String(id) },
          { id: String(id) },
          { patientId: String(id) },
        ],
      });
    }

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
      data: patient,
    });
  } catch (error) {
    console.error("❌ Delete patient error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete patient",
      error: error.message,
    });
  }
};
