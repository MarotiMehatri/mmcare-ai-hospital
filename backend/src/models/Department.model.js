import mongoose from "mongoose";

const { Schema } = mongoose;

const departmentSchema = new Schema(
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

    departmentId: {
      type: String,
      index: true,
    },

    name: {
      type: String,
      trim: true,
      index: true,
    },

    departmentName: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    headDoctor: {
      type: Schema.Types.Mixed,
      default: null,
    },

    doctorCount: {
      type: Number,
      default: 0,
    },

    patientCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
    strict: false,
    collection: "departments",
  }
);

departmentSchema.index({ name: 1 });

const Department =
  mongoose.models.Department ||
  mongoose.model("Department", departmentSchema);

export default Department;