import mongoose from "mongoose";

const { Schema } = mongoose;

const billingSchema = new Schema(
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

    billId: {
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

    items: {
      type: Schema.Types.Mixed,
      default: [],
    },

    subtotal: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    amount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    status: {
      type: String,
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      default: "",
    },

    billingDate: {
      type: String,
      default: "",
    },

    dueDate: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    strict: false,
    collection: "billings",
  }
);

billingSchema.index({ patientId: 1 });
billingSchema.index({ paymentStatus: 1 });

const Billing =
  mongoose.models.Billing ||
  mongoose.model("Billing", billingSchema);

export default Billing;