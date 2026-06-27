import fs from "fs/promises";
import path from "path";
import { buildReportAnalysisPrompt } from "../utils/reportPromptBuilder.js";
import {
  safeJsonParser,
  normalizeReportAnalysis,
} from "../utils/safeJsonParser.js";
import { geminiClient } from "../config/gemini.js";

export const analyzeReportWithGemini = async ({
  storedFilePath,
  mimeType,
  reportType,
  notes,
}) => {
  if (!storedFilePath) {
    throw new Error("Stored file path is required for analysis.");
  }

  const absoluteFilePath = path.resolve(storedFilePath);
  const prompt = buildReportAnalysisPrompt({ reportType, notes });

  let responseText = "";

  // For PDFs and larger reusable files, use Files API.
  // For images, Files API also works cleanly in the same workflow.
  const uploadedFile = await geminiClient.files.upload({
    file: absoluteFilePath,
    config: { mimeType },
  });

  const response = await geminiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
          {
            fileData: {
              mimeType: uploadedFile.mimeType || mimeType,
              fileUri: uploadedFile.uri,
            },
          },
        ],
      },
    ],
  });

  responseText = response.text || "";

  const parsed = safeJsonParser(responseText);
  return normalizeReportAnalysis(parsed, reportType);
};
