import { GoogleGenAI } from "@google/genai";

export const handleAIChat = async (req, res) => {
  try {
    const { message, patientId, role } = req.body;
    const file = req.file;

    // Validate input
    if (!message && !file) {
      return res.status(400).json({
        success: false,
        error: "Message or scan file is required.",
      });
    }

    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "GEMINI_API_KEY is missing in backend .env file.",
      });
    }

    // Create OpenAI client only after key check
    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // File details
    let fileInfo = "No file uploaded.";

    if (file) {
      fileInfo = `
Uploaded File Name: ${file.originalname}
File Type: ${file.mimetype}
File Size: ${file.size} bytes
`;
    }

    // Create hospital AI prompt
    const prompt = `
You are an intelligent and helpful AI medical assistant for a Hospital Management System.

Patient Role: ${role || "patient"}
Patient ID: ${patientId || "N/A"}

Patient Message:
${message || "No text message provided."}

File Information:
${fileInfo}

Important Rules:
1. Give short, clear, and patient-friendly answers.
2. Do not provide a final diagnosis.
3. Suggest the correct hospital department if possible.
4. Suggest doctor consultation when required.
5. If symptoms seem serious or emergency-related, advise immediate hospital or emergency support.
6. Keep the tone professional, safe, and supportive.
7. Format the response clearly with points if needed.
`;

    // Call OpenAI
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply =
      response?.text?.trim() || "Sorry, I could not generate a response.";

    console.log("========== AI CHAT REQUEST SUCCESS ==========");

    return res.status(200).json({
      success: true,
      reply,
      meta: {
        patientId: patientId || null,
        role: role || "patient",
        hasFile: !!file,
      },
    });
  } catch (error) {
    console.error("========== GEMINI AI CONTROLLER ERROR ==========");
    console.error("Error Message:", error.message);
    console.error("Full Error:", error);

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        error:
          "Uploaded file is too large. Please upload a file smaller than 5MB.",
      });
    }

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to process AI request.",
    });
  }
};
