export const safeJsonParser = (text = "") => {
  try {
    return JSON.parse(text);
  } catch (error) {
    // Try extracting JSON block
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace !== -1) {
      const possibleJson = text.slice(firstBrace, lastBrace + 1);
      return JSON.parse(possibleJson);
    }

    throw new Error("Failed to parse AI JSON response.");
  }
};

export const normalizeReportAnalysis = (
  data = {},
  fallbackType = "Medical Report",
) => {
  return {
    reportTitle: data.reportTitle || "Medical Report Analysis",
    reportType: data.reportType || fallbackType,
    summary: data.summary || "No summary generated.",
    keyFindings: Array.isArray(data.keyFindings) ? data.keyFindings : [],
    abnormalValues: Array.isArray(data.abnormalValues)
      ? data.abnormalValues
      : [],
    criticalAlerts: Array.isArray(data.criticalAlerts)
      ? data.criticalAlerts
      : [],
    possibleConditions: Array.isArray(data.possibleConditions)
      ? data.possibleConditions
      : [],
    recommendedDepartment: data.recommendedDepartment || "General Medicine",
    urgencyLevel: ["low", "medium", "high"].includes(
      String(data.urgencyLevel || "").toLowerCase(),
    )
      ? String(data.urgencyLevel).toLowerCase()
      : "low",
    nextSteps: Array.isArray(data.nextSteps) ? data.nextSteps : [],
    disclaimer:
      data.disclaimer ||
      "AI analysis is supportive only and not a final medical diagnosis.",
  };
};
