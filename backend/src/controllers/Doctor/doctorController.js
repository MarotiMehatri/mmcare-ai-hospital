import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Doctor from "../../models/Doctor.model.js";

// ============================================================
// HELPER: CHECK VALID MONGODB OBJECT ID
// ============================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// ============================================================
// HELPER: REMOVE SENSITIVE FIELDS
// ============================================================

const removeSensitiveFields = (doctorObject) => {
  if (!doctorObject) {
    return null;
  }

  const sanitized = { ...doctorObject };

  // Never return password
  delete sanitized.password;

  // Remove possible password variants
  delete sanitized.Password;
  delete sanitized.pass;
  delete sanitized.confirmPassword;

  return sanitized;
};

// ============================================================
// HELPER: NORMALIZE DOCTOR RESPONSE
// ============================================================

const normalizeDoctor = (doctor) => {
  if (!doctor) {
    return null;
  }

  const doctorObject =
    typeof doctor.toObject === "function" ? doctor.toObject() : { ...doctor };

  const sanitizedDoctor = removeSensitiveFields(doctorObject);

  return {
    ...sanitizedDoctor,

    // MongoDB ID
    id:
      doctorObject._id?.toString() ||
      doctorObject.id ||
      doctorObject.legacyId ||
      null,

    _id: doctorObject._id?.toString() || null,

    // Legacy ID
    legacyId: doctorObject.legacyId || doctorObject.id || null,
  };
};

// ============================================================
// HELPER: NORMALIZE EMAIL
// ============================================================

const normalizeEmail = (email) => {
  if (!email) {
    return "";
  }

  return String(email).trim().toLowerCase();
};

// ============================================================
// HELPER: NORMALIZE STRING
// ============================================================

const normalizeString = (value) => {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
};

// ============================================================
// HELPER: BUILD DOCTOR ID QUERY
// ============================================================

const buildDoctorIdQuery = (id) => {
  const stringId = String(id).trim();

  if (isValidObjectId(stringId)) {
    return {
      $or: [{ _id: stringId }, { legacyId: stringId }, { id: stringId }],
    };
  }

  return {
    $or: [{ legacyId: stringId }, { id: stringId }],
  };
};

// ============================================================
// GET ALL DOCTORS
// GET /api/doctors
// ============================================================

export const getDoctors = async (req, res) => {
  try {
    const {
      email,
      userId,
      department,
      specialization,
      city,
      status,
      search,
      gender,
      consultationMode,
      page = 1,
      limit = 100,
    } = req.query;

    const filter = {};

    // --------------------------------------------------------
    // EMAIL
    // --------------------------------------------------------

    if (email) {
      filter.email = normalizeEmail(email);
    }

    // --------------------------------------------------------
    // USER ID
    // --------------------------------------------------------

    if (userId) {
      filter.$or = [
        {
          userId: normalizeString(userId),
        },
        {
          legacyUserId: normalizeString(userId),
        },
      ];
    }

    // --------------------------------------------------------
    // DEPARTMENT
    // --------------------------------------------------------

    if (department) {
      filter.department = normalizeString(department);
    }

    // --------------------------------------------------------
    // SPECIALIZATION
    // --------------------------------------------------------

    if (specialization) {
      filter.specialization = normalizeString(specialization);
    }

    // --------------------------------------------------------
    // CITY
    // --------------------------------------------------------

    if (city) {
      filter.city = normalizeString(city);
    }

    // --------------------------------------------------------
    // STATUS
    // --------------------------------------------------------

    if (status) {
      filter.status = normalizeString(status);
    }

    // --------------------------------------------------------
    // GENDER
    // --------------------------------------------------------

    if (gender) {
      filter.gender = normalizeString(gender);
    }

    // --------------------------------------------------------
    // CONSULTATION MODE
    // --------------------------------------------------------

    if (consultationMode) {
      filter.consultationMode = normalizeString(consultationMode);
    }

    // --------------------------------------------------------
    // SEARCH
    // --------------------------------------------------------

    if (search) {
      const searchValue = normalizeString(search);

      if (searchValue) {
        const escapedSearch = searchValue.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );

        const searchRegex = new RegExp(escapedSearch, "i");

        filter.$or = [
          { FullName: searchRegex },
          { fullName: searchRegex },
          { email: searchRegex },
          { department: searchRegex },
          { specialization: searchRegex },
          { city: searchRegex },
          { legacyId: searchRegex },
          { id: searchRegex },
        ];
      }
    }

    // --------------------------------------------------------
    // PAGINATION
    // --------------------------------------------------------

    const currentPage = Math.max(Number(page) || 1, 1);

    const currentLimit = Math.min(Math.max(Number(limit) || 100, 1), 500);

    const skip = (currentPage - 1) * currentLimit;

    // --------------------------------------------------------
    // MONGODB QUERY
    // --------------------------------------------------------

    const [doctors, total] = await Promise.all([
      Doctor.find(filter)
        .sort({
          createdAt: -1,
          _id: -1,
        })
        .skip(skip)
        .limit(currentLimit)
        .lean(),

      Doctor.countDocuments(filter),
    ]);

    // --------------------------------------------------------
    // NORMALIZE
    // --------------------------------------------------------

    const normalizedDoctors = doctors.map(normalizeDoctor);

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({
      success: true,
      count: normalizedDoctors.length,
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages: Math.ceil(total / currentLimit),
      data: normalizedDoctors,
    });
  } catch (error) {
    console.error("❌ Error fetching doctors:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};

// ============================================================
// GET DOCTOR BY ID
// GET /api/doctors/:id
// ============================================================

export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    const doctor = await Doctor.findOne(buildDoctorIdQuery(id)).lean();

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: normalizeDoctor(doctor),
    });
  } catch (error) {
    console.error("❌ Error fetching doctor:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch doctor",
      error: error.message,
    });
  }
};

// ============================================================
// GET DOCTOR BY EMAIL
// GET /api/doctors/email?email=doctor@example.com
// ============================================================

export const getDoctorByEmail = async (req, res) => {
  try {
    const email = normalizeEmail(req.query.email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const doctors = await Doctor.find({
      email,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    const normalizedDoctors = doctors.map(normalizeDoctor);

    return res.status(200).json({
      success: true,
      count: normalizedDoctors.length,
      data: normalizedDoctors,
    });
  } catch (error) {
    console.error("❌ Error fetching doctor by email:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch doctor",
      error: error.message,
    });
  }
};

// ============================================================
// CREATE DOCTOR
// POST /api/doctors
// ============================================================

export const createDoctor = async (req, res) => {
  try {
    const body = {
      ...req.body,
    };

    // --------------------------------------------------------
    // NORMALIZE EMAIL
    // --------------------------------------------------------

    if (body.email) {
      body.email = normalizeEmail(body.email);
    }

    // --------------------------------------------------------
    // NORMALIZE VALUES
    // --------------------------------------------------------

    if (body.FullName) {
      body.FullName = normalizeString(body.FullName);
    }

    if (body.department) {
      body.department = normalizeString(body.department);
    }

    if (body.specialization) {
      body.specialization = normalizeString(body.specialization);
    }

    if (body.city) {
      body.city = normalizeString(body.city);
    }

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!body.FullName) {
      return res.status(400).json({
        success: false,
        message: "Doctor full name is required",
      });
    }

    if (!body.email) {
      return res.status(400).json({
        success: false,
        message: "Doctor email is required",
      });
    }

    if (!body.password) {
      return res.status(400).json({
        success: false,
        message: "Doctor password is required",
      });
    }

    // --------------------------------------------------------
    // DUPLICATE EMAIL
    // --------------------------------------------------------

    const existingDoctor = await Doctor.findOne({
      email: body.email,
    });

    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: "Doctor with this email already exists",
      });
    }

    // --------------------------------------------------------
    // HASH PASSWORD
    // --------------------------------------------------------

    if (body.password && !body.password.startsWith("$2")) {
      body.password = await bcrypt.hash(body.password, 12);
    }

    // --------------------------------------------------------
    // CREATE
    // --------------------------------------------------------

    const doctor = await Doctor.create(body);

    return res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: normalizeDoctor(doctor),
    });
  } catch (error) {
    console.error("❌ Error creating doctor:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Doctor already exists",
        error: error.message,
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Doctor validation failed",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create doctor",
      error: error.message,
    });
  }
};

// ============================================================
// UPDATE DOCTOR
// PUT /api/doctors/:id
// ============================================================

export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    const updateData = {
      ...req.body,
    };

    // Never update _id
    delete updateData._id;

    // Never accept createdAt
    delete updateData.createdAt;

    // Normalize email
    if (updateData.email) {
      updateData.email = normalizeEmail(updateData.email);
    }

    // Normalize name
    if (updateData.FullName) {
      updateData.FullName = normalizeString(updateData.FullName);
    }

    // Hash new password
    if (updateData.password) {
      if (!updateData.password.startsWith("$2")) {
        updateData.password = await bcrypt.hash(updateData.password, 12);
      }
    }

    const doctor = await Doctor.findOneAndUpdate(
      buildDoctorIdQuery(id),
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: normalizeDoctor(doctor),
    });
  } catch (error) {
    console.error("❌ Error updating doctor:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Doctor email already exists",
        error: error.message,
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Doctor validation failed",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update doctor",
      error: error.message,
    });
  }
};

// ============================================================
// DELETE DOCTOR
// DELETE /api/doctors/:id
// ============================================================

export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    const doctor = await Doctor.findOneAndDelete(buildDoctorIdQuery(id));

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
      data: normalizeDoctor(doctor),
    });
  } catch (error) {
    console.error("❌ Error deleting doctor:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete doctor",
      error: error.message,
    });
  }
};

// ============================================================
// LOGIN DOCTOR
// POST /api/doctors/login
// ============================================================

export const loginDoctor = async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);

    const password = req.body?.password;

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // --------------------------------------------------------
    // JWT SECRET CHECK
    // --------------------------------------------------------

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing from .env");

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration is missing",
      });
    }

    // --------------------------------------------------------
    // FIND DOCTOR
    //
    // password must be explicitly selected
    // if Doctor.model.js has select: false
    // --------------------------------------------------------

    const doctor = await Doctor.findOne({
      email,
    }).select("+password");

    // --------------------------------------------------------
    // INVALID EMAIL
    // --------------------------------------------------------

    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // --------------------------------------------------------
    // PASSWORD CHECK
    // --------------------------------------------------------

    if (!doctor.password) {
      console.error(`❌ Password hash missing for doctor: ${email}`);

      return res.status(500).json({
        success: false,
        message: "Doctor account password is not configured",
      });
    }

    const passwordMatch = await bcrypt.compare(
      String(password),
      doctor.password,
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // --------------------------------------------------------
    // ACCOUNT STATUS
    // --------------------------------------------------------

    if (doctor.status && String(doctor.status).toLowerCase() !== "active") {
      return res.status(403).json({
        success: false,
        message: "Doctor account is not active",
      });
    }

    // --------------------------------------------------------
    // CREATE JWT
    // --------------------------------------------------------

    const token = jwt.sign(
      {
        id: doctor._id.toString(),
        doctorId: doctor._id.toString(),
        role: "doctor",
        email: doctor.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      },
    );

    // --------------------------------------------------------
    // SAFE DOCTOR DATA
    // --------------------------------------------------------

    const doctorData = normalizeDoctor(doctor);

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Doctor login successful",

      token,

      doctor: doctorData,

      // Keep data as an alias if
      // another frontend component uses data
      data: doctorData,
    });
  } catch (error) {
    console.error("❌ Error logging in doctor:", error);

    return res.status(500).json({
      success: false,
      message: "Doctor login failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
