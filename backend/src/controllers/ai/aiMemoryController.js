// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const aiMemorySchema = new Schema(
//   {
//     legacyId: {
//       type: String,
//       index: true,
//       unique: true,
//       sparse: true,
//     },

//     patientId: {
//       type: String,
//       required: true,
//       index: true,
//     },

//     patientName: {
//       type: String,
//       default: "",
//     },

//     type: {
//       type: String,
//       default: "ai-summary",
//       index: true,
//     },

//     title: {
//       type: String,
//       default: "AI Memory",
//     },

//     description: {
//       type: String,
//       default: "",
//     },

//     source: {
//       type: String,
//       default: "Doctor Report",
//     },

//     critical: {
//       type: Boolean,
//       default: false,
//       index: true,
//     },
//   },
//   {
//     timestamps: true,
//     strict: false,
//     collection: "aiMemory",
//   },
// );

// aiMemorySchema.index({
//   patientId: 1,
//   createdAt: -1,
// });

// const AIMemory =
//   mongoose.models.AIMemory ||
//   mongoose.model(
//     "AIMemory",
//     aiMemorySchema,
//   );

// export default AIMemory;

import AIMemory from "../../models/AIMemory.model.js";

/*
|--------------------------------------------------------------------------
| GET ALL AI MEMORY
|--------------------------------------------------------------------------
*/

export const getAllAIMemory = async (
  req,
  res,
) => {
  try {
    const memory = await AIMemory.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: memory.length,
      data: memory,
    });
  } catch (error) {
    console.error(
      "❌ Get AI Memory Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch all AI Memory.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| CREATE AI MEMORY
|--------------------------------------------------------------------------
*/

export const createAIMemory = async (
  req,
  res,
) => {
  try {
    const {
      patientId,
      patientName,
      type,
      title,
      description,
      source,
      critical,
    } = req.body;

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "patientId is required.",
      });
    }

    const memory =
      await AIMemory.create({
        legacyId: `AIM-${Date.now()}`,

        patientId: String(patientId),

        patientName:
          patientName || "",

        type:
          type || "ai-summary",

        title:
          title || "AI Memory",

        description:
          description || "",

        source:
          source || "Doctor Report",

        critical:
          Boolean(critical),
      });

    return res.status(201).json({
      success: true,
      message:
        "AI Memory created successfully.",
      data: memory,
    });
  } catch (error) {
    console.error(
      "❌ Create AI Memory Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create AI Memory.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET MEMORY BY PATIENT
|--------------------------------------------------------------------------
*/

export const getAIMemoryByPatient = async (
  req,
  res,
) => {
  try {
    const { patientId } = req.params;

    const memory =
      await AIMemory.find({
        patientId: String(patientId),
      }).sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: memory.length,
      data: memory,
    });
  } catch (error) {
    console.error(
      "❌ Get Patient AI Memory Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch AI Memory.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| MEMORY SUMMARY
|--------------------------------------------------------------------------
*/

export const getAIMemorySummary = async (
  req,
  res,
) => {
  try {
    const { patientId } = req.params;

    const memory =
      await AIMemory.find({
        patientId: String(patientId),
      }).lean();

    const summary = {
      totalRecords: memory.length,

      symptomCount: memory.filter(
        (item) =>
          item.type === "symptom",
      ).length,

      medicationCount: memory.filter(
        (item) =>
          item.type === "medication",
      ).length,

      criticalCount: memory.filter(
        (item) =>
          item.critical === true,
      ).length,

      allergyCount: memory.filter(
        (item) =>
          item.type === "allergy",
      ).length,

      conditionCount: memory.filter(
        (item) =>
          item.type === "condition",
      ).length,
    };

    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error(
      "❌ AI Memory Summary Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch memory summary.",
      error: error.message,
    });
  }
};