// ============================================================
// MMCare AI Hospital
// Doctor Migration Script
// ============================================================
//
// Location:
// backend/src/scripts/migrateDoctors.js
//
// Purpose:
// - Migrate doctorSeedData into MongoDB
// - Preserve legacy doctor IDs
// - Hash plaintext passwords
// - Normalize doctor data
// - Prevent duplicate doctors
//
// ============================================================

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

import Doctor from "../models/Doctor.model.js";
import doctorSeedData from "../data/doctorSeedData.js";

// ============================================================
// LOAD .ENV FROM BACKEND ROOT
// ============================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../../.env");

dotenv.config({
  path: envPath,
});

console.log("Loading environment file:");
console.log(envPath);

// ============================================================
// CONFIG
// ============================================================

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("ERROR: MONGODB_URI is missing.");
  console.error("Expected .env location:");
  console.error(envPath);
  process.exit(1);
}

console.log("MONGODB_URI loaded successfully.");

// ============================================================
// NORMALIZE DOCTOR DATA
// ============================================================

const normalizeDoctor = async (doctor) => {
  const normalized = {
    ...doctor,

    // Original JSON ID
    legacyId: String(doctor.id || "").trim(),

    // Doctor ID
    id: String(doctor.id || "").trim(),

    // Name
    FullName: String(doctor.FullName || "").trim(),

    // Email
    email: String(doctor.email || "")
      .trim()
      .toLowerCase(),

    // Experience
    experience:
      doctor.experience !== undefined &&
      doctor.experience !== null &&
      doctor.experience !== ""
        ? Number(doctor.experience)
        : 0,

    // Gender
    gender: doctor.gender
      ? String(doctor.gender)
          .trim()
          .toLowerCase()
          .replace(/^./, (char) => char.toUpperCase())
      : "",

    // Status
    status: doctor.status
      ? String(doctor.status)
          .trim()
          .toLowerCase()
          .replace(/^./, (char) => char.toUpperCase())
      : "Active",

    // Availability
    availableDays: doctor.availableDays || doctor.availableTime || "",

    availableTime: doctor.availableTime || doctor.availableDays || "",

    // Consultation mode
    consultationMode: doctor.consultationMode
      ? String(doctor.consultationMode).trim()
      : "",

    // Numeric fields
    consultationFee: Number(doctor.consultationFee) || 0,

    followUpFee: Number(doctor.followUpFee) || 0,

    totalPatients: Number(doctor.totalPatients) || 0,

    totalAppointments: Number(doctor.totalAppointments) || 0,

    rating: Number(doctor.rating) || 0,
  };

  // ==========================================================
  // HASH PASSWORD
  // ==========================================================

  if (doctor.password) {
    normalized.password = await bcrypt.hash(String(doctor.password), 12);
  }

  return normalized;
};

// ============================================================
// MIGRATION
// ============================================================

const migrateDoctors = async () => {
  let connected = false;

  try {
    console.log("");
    console.log("============================================");
    console.log("   MMCare AI Hospital - Doctor Migration");
    console.log("============================================");
    console.log("");

    // --------------------------------------------------------
    // CONNECT TO MONGODB
    // --------------------------------------------------------

    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI);

    connected = true;

    console.log("MongoDB connected successfully.");
    console.log("");

    // --------------------------------------------------------
    // CHECK SOURCE DATA
    // --------------------------------------------------------

    if (!Array.isArray(doctorSeedData)) {
      throw new Error("doctorSeedData must be an array.");
    }

    console.log(`Source doctors: ${doctorSeedData.length}`);

    // --------------------------------------------------------
    // CHECK EXISTING DOCTORS
    // --------------------------------------------------------

    const existingCount = await Doctor.countDocuments();

    console.log(`Existing MongoDB doctors: ${existingCount}`);

    console.log("");

    // --------------------------------------------------------
    // COUNTERS
    // --------------------------------------------------------

    let inserted = 0;
    let updated = 0;
    let skipped = 0;

    // --------------------------------------------------------
    // MIGRATE EACH DOCTOR
    // --------------------------------------------------------

    for (const sourceDoctor of doctorSeedData) {
      const legacyId = String(sourceDoctor.id || "").trim();

      try {
        // ----------------------------------------------------
        // VALIDATE ID
        // ----------------------------------------------------

        if (!legacyId) {
          console.warn("Skipping doctor without ID.");

          skipped++;
          continue;
        }

        // ----------------------------------------------------
        // VALIDATE EMAIL
        // ----------------------------------------------------

        const email = String(sourceDoctor.email || "")
          .trim()
          .toLowerCase();

        if (!email) {
          console.warn(`${legacyId}: email missing - skipped`);

          skipped++;
          continue;
        }

        // ----------------------------------------------------
        // NORMALIZE
        // ----------------------------------------------------

        const normalizedDoctor = await normalizeDoctor(sourceDoctor);

        // ----------------------------------------------------
        // FIND EXISTING DOCTOR
        // ----------------------------------------------------

        const existingDoctor = await Doctor.findOne({
          $or: [
            {
              legacyId: legacyId,
            },
            {
              email: email,
            },
            {
              id: legacyId,
            },
          ],
        });

        // ----------------------------------------------------
        // UPDATE EXISTING DOCTOR
        // ----------------------------------------------------

        if (existingDoctor) {
          await Doctor.findByIdAndUpdate(
            existingDoctor._id,
            {
              $set: normalizedDoctor,
            },
            {
              new: true,
              runValidators: true,
            },
          );

          console.log(`Updated: ${legacyId} - ${sourceDoctor.FullName}`);

          updated++;
          continue;
        }

        // ----------------------------------------------------
        // INSERT NEW DOCTOR
        // ----------------------------------------------------

        await Doctor.create(normalizedDoctor);

        console.log(`Inserted: ${legacyId} - ${sourceDoctor.FullName}`);

        inserted++;
      } catch (doctorError) {
        console.error(`Failed: ${legacyId}`);

        console.error(`Reason: ${doctorError.message}`);

        skipped++;
      }
    }

    // --------------------------------------------------------
    // FINAL COUNT
    // --------------------------------------------------------

    const finalCount = await Doctor.countDocuments();

    // --------------------------------------------------------
    // FINAL OUTPUT
    // --------------------------------------------------------

    console.log("");
    console.log("============================================");
    console.log("             MIGRATION COMPLETE");
    console.log("============================================");

    console.log(`Source doctors : ${doctorSeedData.length}`);

    console.log(`Inserted       : ${inserted}`);

    console.log(`Updated        : ${updated}`);

    console.log(`Skipped        : ${skipped}`);

    console.log(`MongoDB total  : ${finalCount}`);

    console.log("============================================");
    console.log("");

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (finalCount !== doctorSeedData.length) {
      console.warn(
        `WARNING: Expected ${doctorSeedData.length} doctors but MongoDB contains ${finalCount}.`,
      );
    } else {
      console.log(`SUCCESS: All ${finalCount} doctors are in MongoDB.`);
    }
  } catch (error) {
    console.error("");
    console.error("Doctor migration failed.");
    console.error("");

    console.error("Error:", error.message);

    if (error.stack) {
      console.error("");
      console.error(error.stack);
    }
  } finally {
    // --------------------------------------------------------
    // CLOSE MONGODB
    // --------------------------------------------------------

    if (connected) {
      try {
        await mongoose.connection.close();

        console.log("MongoDB connection closed.");
      } catch (closeError) {
        console.error("Failed to close MongoDB:", closeError.message);
      }
    }
  }
};

// ============================================================
// START MIGRATION
// ============================================================

migrateDoctors();
