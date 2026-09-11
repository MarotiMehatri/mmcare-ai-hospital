import mongoose from "mongoose";

const { Schema } = mongoose;

const prescriptionSchema = new Schema(
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

    prescriptionId: {
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

    patient: {
      type: Schema.Types.Mixed,
      default: null,
    },

    doctor: {
      type: Schema.Types.Mixed,
      default: null,
    },

    medicines: {
      type: Schema.Types.Mixed,
      default: [],
    },

    diagnosis: {
      type: String,
      default: "",
    },

    instructions: {
      type: Schema.Types.Mixed,
      default: [],
    },

    notes: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      default: "",
    },

    followUpDate: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
    strict: false,
    collection: "prescriptions",
  }
);

prescriptionSchema.index({ patientId: 1 });
prescriptionSchema.index({ doctorId: 1 });

const Prescription =
  mongoose.models.Prescription ||
  mongoose.model("Prescription", prescriptionSchema);

export default Prescription;