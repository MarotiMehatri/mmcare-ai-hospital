import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: Number,
    gender: String,
    phone: String,
    address: String,

    disease: String,

    email: String,

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
