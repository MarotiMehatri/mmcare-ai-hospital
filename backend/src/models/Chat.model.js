import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.Mixed,
      default: null,
    },

    receiverId: {
      type: Schema.Types.Mixed,
      default: null,
    },

    senderRole: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      default: "",
    },

    messageType: {
      type: String,
      default: "text",
    },

    fileUrl: {
      type: String,
      default: "",
    },

    fileName: {
      type: String,
      default: "",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: true,
  }
);

const chatSchema = new Schema(
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

    chatId: {
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

    participants: {
      type: Schema.Types.Mixed,
      default: [],
    },

    messages: {
      type: [messageSchema],
      default: [],
    },

    lastMessage: {
      type: String,
      default: "",
    },

    lastMessageAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
    strict: false,
    collection: "chats",
  }
);

chatSchema.index({ patientId: 1 });
chatSchema.index({ doctorId: 1 });

const Chat =
  mongoose.models.Chat ||
  mongoose.model("Chat", chatSchema);

export default Chat;