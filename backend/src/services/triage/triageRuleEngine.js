const textIncludes = (text = "", list = []) => {
  const lower = text.toLowerCase();
  return list.some((item) => lower.includes(item.toLowerCase()));
};

export const applyEmergencyOverrides = (input, aiResult) => {
  const symptomsText = `
    ${input.symptoms}
    ${input.existingConditions}
    ${input.medications}
  `;

  const hasChestPain =
    input.chestPain ||
    textIncludes(symptomsText, ["chest pain", "heart pain", "tightness"]);
  const hasBreathingIssue =
    input.breathingIssue ||
    textIncludes(symptomsText, [
      "breathing difficulty",
      "shortness of breath",
      "cannot breathe",
    ]);
  const hasStrokeLikeSigns = textIncludes(symptomsText, [
    "slurred speech",
    "face drooping",
    "one side weakness",
    "cannot move arm",
    "stroke",
  ]);
  const hasSevereNeuroSigns = textIncludes(symptomsText, [
    "unconscious",
    "fainting",
    "seizure",
    "convulsion",
  ]);
  const veryHighFever = textIncludes(symptomsText, ["104", "105"]);

  if (hasStrokeLikeSigns || hasSevereNeuroSigns) {
    return {
      ...aiResult,
      severity: "Emergency",
      department: "Emergency Medicine",
      specialization: "Emergency Specialist",
      recommendedAction: "Go to the emergency department immediately",
      visitType: "Emergency",
      timeframe: "Immediate",
      emergency: true,
      redFlags: [
        ...(aiResult.redFlags || []),
        "Possible stroke or severe neurological emergency",
      ],
    };
  }

  if (hasChestPain && hasBreathingIssue) {
    return {
      ...aiResult,
      severity: "Emergency",
      department: "Emergency Medicine",
      specialization: "Emergency Specialist",
      recommendedAction: "Immediate emergency evaluation required",
      visitType: "Emergency",
      timeframe: "Immediate",
      emergency: true,
      redFlags: [
        ...(aiResult.redFlags || []),
        "Chest pain with breathing difficulty can be serious",
      ],
    };
  }

  if (hasChestPain || hasBreathingIssue || veryHighFever) {
    return {
      ...aiResult,
      severity: aiResult.severity === "Emergency" ? "Emergency" : "High",
      recommendedAction:
        aiResult.severity === "Emergency"
          ? aiResult.recommendedAction
          : "Urgent same-day clinical evaluation is recommended",
      timeframe:
        aiResult.severity === "Emergency" ? "Immediate" : "Within 6-12 hours",
    };
  }

  return aiResult;
};
