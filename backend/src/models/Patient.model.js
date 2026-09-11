import mongoose from "mongoose";

const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    legacyId: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
    },

    id: {
      type: String,
      index: true,
    },

    patientId: {
      type: String,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    FullName: {
      type: String,
      trim: true,
    },

    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      select: false,
    },

    phone: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },

    dob: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    address: {
      type: Schema.Types.Mixed,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    pincode: {
      type: String,
      default: "",
    },

    emergencyContact: {
      type: Schema.Types.Mixed,
      default: null,
    },

    medicalHistory: {
      type: Schema.Types.Mixed,
      default: [],
    },

    allergies: {
      type: Schema.Types.Mixed,
      default: [],
    },

    currentMedications: {
      type: Schema.Types.Mixed,
      default: [],
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
    strict: false,
    collection: "patients",
  }
);

patientSchema.index({ email: 1 });
patientSchema.index({ phone: 1 });
patientSchema.index({ patientId: 1 });

const Patient =
  mongoose.models.Patient ||
  mongoose.model("Patient", patientSchema);

export default Patient;