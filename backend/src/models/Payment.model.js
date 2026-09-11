import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new Schema(
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

    paymentId: {
      type: String,
      index: true,
    },

    billId: {
      type: Schema.Types.Mixed,
      default: null,
    },

    patientId: {
      type: Schema.Types.Mixed,
      default: null,
    },

    appointmentId: {
      type: Schema.Types.Mixed,
      default: null,
    },

    amount: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    paymentMethod: {
      type: String,
      default: "",
    },

    transactionId: {
      type: String,
      default: "",
    },

    paymentGateway: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Pending",
      index: true,
    },

    paidAt: {
      type: String,
      default: "",
    },

    failureReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    strict: false,
    collection: "payments",
  }
);

paymentSchema.index({ patientId: 1 });
paymentSchema.index({ transactionId: 1 });

const Payment =
  mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);

export default Payment;