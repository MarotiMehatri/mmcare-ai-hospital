import dotenv from "dotenv";

dotenv.config();

export const env = {
  post: process.env.PORT || 8000,
  frontendUrl: process.env.FRONTEND_URL || "http:localhost:5173",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-3-flash",
};

if (!env.geminiApiKey) {
  console.warn("GEMINI_API_KEY is missing in .env");
}
