import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      default: null,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    type: {
      type: String,
      enum: [
        "appointment",
        "prescription",
        "report",
        "message",
        "payment",
        "system",
        "general",
      ],
      default: "general",
      index: true,
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    link: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

notificationSchema.index({
  patientId: 1,
  createdAt: -1,
});

notificationSchema.index({
  patientId: 1,
  isRead: 1,
});

notificationSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,

  transform: (doc, ret) => {
    ret.id = ret._id?.toString();

    if (ret.patientId) {
      ret.patientId = ret.patientId.toString();
    }

    if (ret.doctorId) {
      ret.doctorId = ret.doctorId.toString();
    }

    if (ret.userId) {
      ret.userId = ret.userId.toString();
    }

    delete ret._id;

    return ret;
  },
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model(
    "Notification",
    notificationSchema,
  );

export default Notification;