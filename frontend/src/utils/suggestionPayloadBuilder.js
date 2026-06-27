export const buildSuggestionPayload = (patient) => {
  return {
    patientId: patient?.id || "",
    patientID: patient?.patientID || "",
    fullName: patient?.fullName || "",
    age: patient?.age || "",
    gender: patient?.gender || "",
    bloodGroup: patient?.bloodGroup || "",
    email: patient?.email || "",
    mobile: patient?.mobile || "",
    allergies: patient?.allergies || [],
    conditions: patient?.conditions || [],
    chronicDiseases: patient?.chronicDiseases || [],
    medications: patient?.medications || [],
    recentSymptoms: patient?.recentSymptoms || ["fatigue", "headache"],
    vitals: patient?.vitals || {
      bloodPressure: "120/80",
      heartRate: "76 bpm",
      sugar: "98 mg/dL",
      spo2: "98%",
      temperature: "98.4°F",
    },
    lastVisit: patient?.lastVisit || "2026-03-20",
    medicalHistory: patient?.medicalHistory || [],
    appointmentHistory: patient?.appointmentHistory || [],
  };
};
