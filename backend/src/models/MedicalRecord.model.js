import mongoose from "mongoose";

const { Schema } = mongoose;

const medicalRecordSchema = new Schema(
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

    recordId: {
      type: String,
      index: true,
    },

    patientId: {
      type: Schema.Types.Mixed,
      default: null,
    },

    doctorId: {
      type: Schema.Types.Mixed,
      default: null,
    },

    appointmentId: {
      type: Schema.Types.Mixed,
      default: null,
    },

    visitDate: {
      type: String,
      default: "",
    },

    diagnosis: {
      type: Schema.Types.Mixed,
      default: "",
    },

    symptoms: {
      type: Schema.Types.Mixed,
      default: [],
    },

    treatment: {
      type: Schema.Types.Mixed,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    vitalSigns: {
      type: Schema.Types.Mixed,
      default: {},
    },

    allergies: {
      type: Schema.Types.Mixed,
      default: [],
    },

    medications: {
      type: Schema.Types.Mixed,
      default: [],
    },

    labResults: {
      type: Schema.Types.Mixed,
      default: [],
    },

    attachments: {
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
    collection: "medicalrecords",
  }
);

medicalRecordSchema.index({ patientId: 1 });
medicalRecordSchema.index({ doctorId: 1 });

const MedicalRecord =
  mongoose.models.MedicalRecord ||
  mongoose.model("MedicalRecord", medicalRecordSchema);

export default MedicalRecord;