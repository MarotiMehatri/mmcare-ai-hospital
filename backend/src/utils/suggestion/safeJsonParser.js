export const safeJsonParser = (text) => {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid model response text");
  }

  let cleaned = text.trim();

  //Remove ```json ... ``` if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
  }
  return JSON.parse(cleaned);
};
