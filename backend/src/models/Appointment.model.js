import mongoose from "mongoose";

const { Schema } = mongoose;

const appointmentSchema = new Schema(
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
      sparse: true,
    },

    appointmentId: {
      type: String,
      index: true,
      sparse: true,
    },

    patientId: {
      type: String,
      required: true,
      index: true,
    },

    patientName: {
      type: String,
      default: "",
      trim: true,
    },

    doctorId: {
      type: String,
      required: true,
      index: true,
    },

    doctorName: {
      type: String,
      default: "",
      trim: true,
    },

    department: {
      type: String,
      default: "",
      trim: true,
    },

    specialization: {
      type: String,
      default: "",
      trim: true,
    },

    date: {
      type: String,
      default: "",
    },

    time: {
      type: String,
      default: "",
    },

    appointmentDate: {
      type: String,
      default: "",
      index: true,
    },

    appointmentTime: {
      type: String,
      default: "",
      index: true,
    },

    reason: {
      type: String,
      default: "",
      trim: true,
    },

    symptoms: {
      type: String,
      default: "",
    },

    consultationMode: {
      type: String,
      default: "offline",
      trim: true,
    },

    consultationFee: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "Pending",
      index: true,
      trim: true,
    },

    notes: {
      type: String,
      default: "",
    },

    visitType: {
      type: String,
      default: "offline",
      trim: true,
    },

    // AI appointment information 
     aiRecommended: { 
      type: Boolean, 
      default: false, 
    }, 

    aiRecommendation: { 
      type: Schema.Types.Mixed, 
      default: null, 
    }, 
    
    urgency: { 
      type: String, 
      default: "", 
    }, 
    
    preparation: { 
      type: String, 
      default: "", 
    }, 
    
    // Optional cancellation information 
    
    cancellationReason: { 
      type: String, 
      default: "", 
    }, 
    
    cancelledAt: { 
      type: Date, 
      default: null, 
    }, 
    
    // Optional completion information 
    completedAt: { 
      type: Date, 
      default: null, 
    },
  },
  {
    timestamps: true,
    strict: false,
    collection: "appointments",
  }
);

appointmentSchema.index({ patientId: 1, appointmentDate: 1 });
appointmentSchema.index({ doctorId: 1, appointmentDate: 1 });
appointmentSchema.index({ doctorId: 1, appointmentDate: 1, appointmentTime: 1 });

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;