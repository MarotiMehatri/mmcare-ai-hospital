import mongoose from "mongoose";

const { Schema } = mongoose;

const medicalReportSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.Mixed,
      required: true,
      index: true,
    },

    patientName: {
      type: String,
      trim: true,
      default: "",
    },

    patientCode: {
      type: String,
      trim: true,
      default: "",
    },

    age: {
      type: Schema.Types.Mixed,
      default: null,
    },

    gender: {
      type: String,
      trim: true,
      default: "",
    },

    bloodGroup: {
      type: String,
      trim: true,
      default: "",
    },

    doctorId: {
      type: Schema.Types.Mixed,
      default: null,
      index: true,
    },

    doctorName: {
      type: String,
      trim: true,
      default: "",
    },

    department: {
      type: String,
      trim: true,
      default: "",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    reportTitle: {
      type: String,
      trim: true,
      default: "",
    },

    reportType: {
      type: String,
      trim: true,
      default: "General",
    },

    reportDate: {
      type: Date,
      default: Date.now,
    },

    uploadDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Uploaded",
        "Completed",
        "Reviewed",
        "Cancelled",
      ],
      default: "Uploaded",
    },

    priority: {
      type: String,
      enum: ["Low", "Normal", "High", "Urgent"],
      default: "Normal",
    },

    symptoms: {
      type: String,
      trim: true,
      default: "",
    },

    diagnosis: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    doctorNotes: {
      type: String,
      trim: true,
      default: "",
    },

    fileName: {
      type: String,
      trim: true,
      default: "",
    },

    fileUrl: {
      type: String,
      trim: true,
      default: "",
    },

    fileType: {
      type: String,
      trim: true,
      default: "",
    },

    fileSize: {
      type: Number,
      default: 0,
    },

    reportNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    uploadedBy: {
      type: String,
      trim: true,
      default: "",
    },

    createdBy: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "MedicalReport",
  medicalReportSchema
);