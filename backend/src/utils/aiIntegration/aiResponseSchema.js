export const aiResponseSchema = {
  type: "object",
  properties: {
    summary: {
      type: "string",
    },
    urgency: {
      type: "string",
      enum: ["low", "medium", "high"],
    },
    recommendedDepartment: {
      type: "string",
    },
    recommendedSpecialist: {
      type: "string",
    },
    precautions: {
      type: "array",
      items: { type: "string" },
    },
    nextSteps: {
      type: "array",
      items: { type: "string" },
    },
    disclaimer: {
      type: "string",
    },
  },
  required: [
    "summary",
    "urgency",
    "recommendedDepartment",
    "recommendedSpecialist",
    "precautions",
    "nextSteps",
    "disclaimer",
  ],
};
