import fs from "fs";
import path from "path";

export const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

export const bytesToMB = (bytes = 0) => {
  return +(bytes / (1024 * 1024)).toFixed(2);
};

export const getFileExtension = (fileName) => {
  return path.extname(fileName).toLowerCase();
};

export const isAllowedReportMimeType = (mimeType = "") => {
  const allowed = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];

  return allowed.includes(mimeType);
};

export const generateStoredFileName = (originalName = "report") => {
  const timestamp = Date.now();
  const safeName = originalName
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
  return `${timestamp}-${safeName}`;
};
