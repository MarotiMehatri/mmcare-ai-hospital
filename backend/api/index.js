import "dotenv/config";

import app from "../src/app.js";
import connectDB from "../src/config/db.js";

let dbConnectionPromise = null;

const connectDatabase = async () => {
  if (!dbConnectionPromise) {
    dbConnectionPromise = connectDB().catch((error) => {
      dbConnectionPromise = null;
      throw error;
    });
  }

  return dbConnectionPromise;
};

export default async function handler(req, res) {
  try {
    console.log("======================================");
    console.log("🌐 Vercel request");
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Origin:", req.headers.origin);
    console.log("======================================");

    await connectDatabase();

    return app(req, res);
  } catch (error) {
    console.error("❌ Vercel backend error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Backend server error",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
}