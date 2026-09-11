import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "../data");

export const readJsonFile = async (fileName, fallback = []) => {
  try {
    const filePath = path.join(dataDir, fileName);
    const fileData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch {
    return fallback;
  }
};

export const writeJsonFile = async (fileName, data) => {
  const filePath = path.join(dataDir, fileName);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};
