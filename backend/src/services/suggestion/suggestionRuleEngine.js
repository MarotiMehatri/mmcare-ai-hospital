export const applySuggestionRules = (patientContext, aiResult) => {
  const finalResult = {
    ...aiResult,
    suggestions: Array.isArray(aiResult.suggestions)
      ? [...aiResult.suggestions]
      : [],
    riskAlerts: Array.isArray(aiResult.riskAlerts)
      ? [...aiResult.riskAlerts]
      : [],
  };

  const symptoms = (patientContext.recentSymptoms || []).map((item) =>
    String(item).toLowerCase(),
  );

  const conditions = (patientContext.conditions || []).map((item) =>
    String(item).toLowerCase(),
  );

  const bloodPressure = String(
    patientContext?.vitals?.bloodPressure || "",
  ).toLowerCase();

  // Chest pain override
  if (symptoms.includes("chest pain")) {
    finalResult.priority = "high";
    finalResult.recommendedDepartment = "Cardiology";
    finalResult.recommendedDoctorType = "Cardiologist";

    finalResult.riskAlerts.unshift(
      "Chest pain detected. Immediate medical consultation is recommended.",
    );

    finalResult.suggestions.unshift({
      id: `rule-${Date.now()}-1`,
      category: "Emergency",
      title: "Seek urgent medical evaluation",
      description:
        "Chest pain may require immediate assessment. Visit emergency care or consult a cardiologist urgently.",
      priority: "high",
      actionType: "appointment",
    });
  }

  // High BP override
  if (bloodPressure.includes("140/90") || bloodPressure.includes("150/")) {
    finalResult.riskAlerts.push("Elevated blood pressure trend detected.");

    finalResult.suggestions.push({
      id: `rule-${Date.now()}-2`,
      category: "Lifestyle",
      title: "Monitor blood pressure regularly",
      description:
        "Check blood pressure daily and reduce high-salt processed food intake.",
      priority: "high",
      actionType: "lifestyle",
    });
  }

  // Diabetes / sugar pattern
  if (conditions.includes("diabetes")) {
    finalResult.suggestions.push({
      id: `rule-${Date.now()}-3`,
      category: "Diet",
      title: "Follow diabetic-friendly meal plan",
      description:
        "Prefer low-sugar meals, consistent mealtimes, and regular glucose monitoring.",
      priority: "medium",
      actionType: "diet",
    });
  }

  // Long follow-up gap
  if (patientContext.lastVisit) {
    const lastVisitDate = new Date(patientContext.lastVisit);
    const diffDays = Math.floor(
      (Date.now() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays > 90) {
      finalResult.suggestions.push({
        id: `rule-${Date.now()}-4`,
        category: "Follow-up",
        title: "Schedule follow-up visit",
        description:
          "No recent visit found in the last 90 days. Book a review appointment.",
        priority: "medium",
        actionType: "appointment",
      });
    }
  }

  // Normalize priority if missing
  if (!finalResult.priority) {
    finalResult.priority = "medium";
  }

  return finalResult;
};
