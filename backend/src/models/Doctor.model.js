import mongoose from "mongoose";

const { Schema } = mongoose;

const timeSlotSchema = new Schema(
  {
    start: {
      type: String,
      default: "",
    },
    end: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const doctorSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    FullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    disease: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      default: "",
    },

    specialization: {
      type: String,
      default: "",
    },

    morningSlot: {
      type: timeSlotSchema,
      default: () => ({}),
    },

    eveningSlot: {
      type: timeSlotSchema,
      default: () => ({}),
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },

    dob: {
      type: Date,
      default: null,
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    qualification: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    city: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    availableDays: {
      type: String,
      default: "Mon-Sat",
    },

    availableTime: {
      type: String,
      default: "",
    },

    consultationMode: {
      type: String,
      default: "Online & Offline",
    },

    consultationFee: {
      type: Number,
      default: 0,
    },

    followUpFee: {
      type: Number,
      default: 0,
    },

    bio: {
      type: String,
      default: "",
    },

    languages: {
      type: String,
      default: "",
    },

    totalPatients: {
      type: Number,
      default: 0,
    },

    totalAppointments: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;