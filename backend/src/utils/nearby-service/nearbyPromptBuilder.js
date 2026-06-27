export function buildNearbyPrompt(payload, providers) {
  const { query, city, serviceType, filters } = payload;

  return `
You are an AI nearby healthcare service assistant for a hospital management system.

User request:
- Query: ${query || "Not provided"}
- City: ${city || "Not provided"}
- Service Type: ${serviceType || "Not provided"}
- Open Now: ${filters.openNow}
- Emergency Only: ${filters.emergencyOnly}
- 24x7: ${filters.is24x7}
- Specialist: ${filters.specialist || "Not provided"}

Available nearby providers:
${JSON.stringify(providers, null, 2)}

Task:
1. Rank the top nearby healthcare providers for the user's need.
2. Prefer emergency readiness, relevance, rating, 24x7 availability, and distance.
3. Return only valid JSON.

Required JSON format:
{
  "querySummary": "short summary",
  "topRecommendation": {
    "name": "provider name",
    "reason": "short reason"
  },
  "results": [
    {
      "id": 1,
      "aiReason": "short AI explanation"
    }
  ]
}
`;
}
