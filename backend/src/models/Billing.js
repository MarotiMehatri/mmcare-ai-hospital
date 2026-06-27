import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PAID", "PENDING", "FAILED"],
      default: "PENDING",
    },

    paymentMethod: String,

    invoiceNumber: String,
  },
  { timestamps: true },
);

const Billing = mongoose.model("Billing", billingSchema);

export default Billing;
