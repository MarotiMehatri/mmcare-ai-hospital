import mongoose from "mongoose";

const { Schema } = mongoose;

const suggestionItemSchema =
  new Schema(
    {
      id: String,

      category: String,

      title: String,

      description: String,

      priority: String,
    },
    { _id: false },
  );

const riskAlertSchema =
  new Schema(
    {
      id: String,

      title: String,

      message: String,

      level: String,
    },
    { _id: false },
  );

const aiSuggestionSchema =
  new Schema(
    {
      legacyId: {
        type: String,
        index: true,
        unique: true,
        sparse: true,
      },

      patientId: {
        type: String,
        index: true,
      },

      patientName: {
        type: String,
        default: "Patient",
      },

      summary: {
        type: String,
        default: "",
      },

      priority: {
        type: String,
        default: "Medium",
      },

      suggestions: {
        type: [suggestionItemSchema],
        default: [],
      },

      riskAlerts: {
        type: [riskAlertSchema],
        default: [],
      },

      recommendedDepartment: {
        type: String,
        default: "General Medicine",
      },

      recommendedDoctorType: {
        type: String,
        default: "General Physician",
      },

      generatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
      strict: false,
      collection: "aiSuggestions",
    },
  );

aiSuggestionSchema.index({
  patientId: 1,
  createdAt: -1,
});

const AISuggestion =
  mongoose.models.AISuggestion ||
  mongoose.model(
    "AISuggestion",
    aiSuggestionSchema,
  );

export default AISuggestion;