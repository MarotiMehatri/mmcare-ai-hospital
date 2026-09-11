import mongoose from "mongoose";

/**
 * ============================================================
 * MMCare AI Hospital - Message Model
 * ============================================================
 *
 * Stores patient <-> doctor chat messages.
 *
 * Supported:
 * - Patient -> Doctor
 * - Doctor -> Patient
 * - Read / unread status
 * - Message timestamps
 * - Optional sender / receiver user IDs
 * - Optional patient / doctor IDs
 */

const messageSchema = new mongoose.Schema(
  {
    /* ========================================================
       PATIENT
    ======================================================== */

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },

    /* ========================================================
       DOCTOR
    ======================================================== */

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: false,
      index: true,
    },

    /* ========================================================
       SENDER
       
       doctor = message sent by doctor
       patient = message sent by patient
    ======================================================== */

    sender: {
      type: String,
      enum: ["patient", "doctor"],
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    /* ========================================================
       SENDER USER ID
       
       Useful if your User collection contains authentication
       information.
    ======================================================== */

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
    },

    /* ========================================================
       RECEIVER USER ID
    ======================================================== */

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
    },

    /* ========================================================
       MESSAGE TEXT
    ======================================================== */

    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    /* ========================================================
       READ STATUS
    ======================================================== */

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    /* ========================================================
       OPTIONAL MESSAGE TYPE
       
       text      = normal chat
       image     = image message
       file      = file/document
    ======================================================== */

    messageType: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },

    /* ========================================================
       OPTIONAL ATTACHMENT
    ======================================================== */

    attachmentUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

/* ============================================================
   INDEXES
============================================================ */

messageSchema.index({
  patientId: 1,
  createdAt: -1,
});

messageSchema.index({
  doctorId: 1,
  createdAt: -1,
});

messageSchema.index({
  patientId: 1,
  doctorId: 1,
  createdAt: -1,
});

/* ============================================================
   JSON RESPONSE
============================================================ */

messageSchema.set("toJSON", {
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

    if (ret.senderId) {
      ret.senderId = ret.senderId.toString();
    }

    if (ret.receiverId) {
      ret.receiverId = ret.receiverId.toString();
    }

    delete ret._id;

    return ret;
  },
});

/* ============================================================
   MODEL
============================================================ */

const Message =
  mongoose.models.Message ||
  mongoose.model("Message", messageSchema);

export default Message;