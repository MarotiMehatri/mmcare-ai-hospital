import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },

    medicines: [
      {
        name: String,
        dosage: String,
        duration: String,
      },
    ],

    diagnosis: String,
    notes: String,
  },
  { timestamps: true },
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
