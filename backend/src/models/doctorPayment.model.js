import mongoose from "mongoose";

const { Schema } = mongoose;

const medicineSchema = new Schema(
  {
    tabletName: {
      type: String,
      default: "",
    },

    medicineName: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      default: 1,
    },

    price: {
      type: Number,
      default: 0,
    },

    dosage: {
      type: String,
      default: "",
    },

    frequency: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
    strict: false,
  }
);

const testSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },

    testName: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    _id: false,
    strict: false,
  }
);

const doctorPaymentSchema = new Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    legacyId: {
      type: String,
      index: true,
      sparse: true,
    },

    id: {
      type: String,
      index: true,
      sparse: true,
    },

    doctorId: {
      type: Schema.Types.Mixed,
      default: null,
      index: true,
    },

    doctorName: {
      type: String,
      default: "",
    },

    patientId: {
      type: Schema.Types.Mixed,
      default: null,
      index: true,
    },

    patientName: {
      type: String,
      default: "",
    },

    patientPhoto: {
      type: String,
      default: "",
    },

    appointmentId: {
      type: Schema.Types.Mixed,
      default: null,
    },

    prescriptionId: {
      type: Schema.Types.Mixed,
      default: null,
    },

    prescriptionIds: {
      type: [Schema.Types.Mixed],
      default: [],
    },

    department: {
      type: String,
      default: "",
    },

    disease: {
      type: String,
      default: "",
    },

    diagnosis: {
      type: String,
      default: "",
    },

    medicines: {
      type: [medicineSchema],
      default: [],
    },

    tests: {
      type: [testSchema],
      default: [],
    },

    consultationFee: {
      type: Number,
      default: 0,
    },

    medicalBill: {
      type: Number,
      default: 0,
    },

    testBill: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    doctorShare: {
      type: Number,
      default: 0,
    },

    paymentMethod: {
      type: String,
      default: "Cash",
    },

    paymentStatus: {
      type: String,
      default: "Pending",
      index: true,
    },

    paymentDate: {
      type: String,
      default: "",
    },

    paidDate: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
    strict: false,
    collection: "doctorPayments",
  }
);

doctorPaymentSchema.index({ doctorId: 1 });
doctorPaymentSchema.index({ patientId: 1 });
doctorPaymentSchema.index({ paymentStatus: 1 });
doctorPaymentSchema.index({ createdAt: -1 });

const DoctorPayment =
  mongoose.models.DoctorPayment ||
  mongoose.model("DoctorPayment", doctorPaymentSchema);

export default DoctorPayment;