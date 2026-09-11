import mongoose from "mongoose";

const { Schema } = mongoose;

const aiMemorySchema = new Schema(
  {
    legacyId: {
      type: String,
      index: true,
      unique: true,
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
    },

    type: {
      type: String,
      default: "ai-summary",
      index: true,
    },

    title: {
      type: String,
      default: "AI Memory",
    },

    description: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "Doctor Report",
    },

    critical: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    strict: false,
    collection: "aiMemory",
  },
);

aiMemorySchema.index({
  patientId: 1,
  createdAt: -1,
});

const AIMemory =
  mongoose.models.AIMemory ||
  mongoose.model(
    "AIMemory",
    aiMemorySchema,
  );

export default AIMemory;