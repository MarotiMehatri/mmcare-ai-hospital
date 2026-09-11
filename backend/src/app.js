import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";

// ===============================
// ROUTES
// ===============================

import usersRoutes from "./Routes/user/usersRoutes.js";
import doctorRoutes from "./Routes/Doctor/doctorRoutes.js";
import patientRoutes from "./Routes/patinet/patientRoutes.js";

import healthTrendsRoutes from "./Routes/healthTrends/healthTrendsRoutes.js";
import messageRoutes from "./Routes/chat/messageRoutes.js";
import notificationRoutes from "./Routes/notification/notificationRoutes.js";

import appointmentRoutes from "./Routes/appointment/appointmentRoutes.js";
import prescriptionRoutes from "./Routes/prescription/prescriptionRoutes.js";

import doctorPaymentRoutes from "./Routes/Doctor/doctorPaymentRoutes.js";

import medicalReportsRoutes from "./Routes/report/medicalReportsRoutes.js";

import patientOnlineStatusRoutes from "./Routes/patinet/patientOnlineStatusRoutes.js";

import aiIntergrationRoutes from "./Routes/ai/aiIntegrationRoutes.js";
import aiSummaryRoutes from "./Routes/ai/aiSummaryRoutes.js";
import aiSuggestionsRoutes from "./Routes/ai/aiSuggestionsRoutes.js";
import aiMemoryRoutes from "./Routes/ai/aiMemoryRoutes.js";

// ===============================
// EXPRESS APP
// ===============================

const app = express();

// ===============================
// ENVIRONMENT
// ===============================

const NODE_ENV = process.env.NODE_ENV || "production";

// ===============================
// CORS
// ===============================

const normalizeOrigin = (origin) => {
  if (!origin) return null;

  return origin
    .trim()
    .replace(/\/+$/, "");
};

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://mmcare-ai-hospital.vercel.app",
  process.env.CLIENT_URL,
]
  .map(normalizeOrigin)
  .filter(Boolean);

console.log("======================================");
console.log("🚀 MMCare AI Backend");
console.log("Environment:", NODE_ENV);
console.log("Allowed CORS origins:");
console.log(allowedOrigins);
console.log("======================================");

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests without Origin.
    // Example: Postman, server-to-server requests.
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = normalizeOrigin(origin);

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    console.error("❌ CORS blocked origin:", origin);

    return callback(
      new Error(`CORS blocked for origin: ${origin}`)
    );
  },

  credentials: false,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],

  optionsSuccessStatus: 204,
};

// IMPORTANT:
// CORS MUST BE BEFORE ROUTES.
app.use(cors(corsOptions));

// Explicit OPTIONS handler.
app.options("*", cors(corsOptions));

// ===============================
// BODY PARSERS
// ===============================

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// ===============================
// COOKIE PARSER
// ===============================

app.use(cookieParser());

// ===============================
// REQUEST LOGGER
// ===============================

app.use((req, res, next) => {
  console.log(
    `➡️ ${req.method} ${req.originalUrl} | Origin: ${
      req.headers.origin || "none"
    }`
  );

  next();
});

// ===============================
// UPLOADS
// ===============================

const uploadsDirectory = path.join(
  process.cwd(),
  "uploads"
);

if (!fs.existsSync(uploadsDirectory)) {
  try {
    fs.mkdirSync(uploadsDirectory, {
      recursive: true,
    });
  } catch (error) {
    console.warn(
      "⚠️ Could not create uploads directory:",
      error.message
    );
  }
}

app.use(
  "/uploads",
  express.static(uploadsDirectory)
);

// ===============================
// ROOT
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MMCare AI Hospital Backend is running",
    environment: NODE_ENV,
    platform: "Vercel",
    timestamp: new Date().toISOString(),
  });
});

// ===============================
// HEALTH CHECK
// ===============================

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MMCare AI Hospital API is healthy",
    database: "MongoDB",
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ===============================
// API ROOT
// ===============================

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MMCare AI Hospital API",
    version: "1.0.0",
    database: "MongoDB",
    endpoints: {
      users: "/api/users",
      doctors: "/api/doctors",
      patients: "/api/patients",
      appointments: "/api/appointments",
      prescriptions: "/api/prescriptions",
      medicalReports: "/api/medical-reports",
      messages: "/api/messages",
      notifications: "/api/notifications",
    },
  });
});

// ===============================
// USER ROUTES
// ===============================

app.use(
  "/api/users",
  usersRoutes
);

// ===============================
// DOCTOR ROUTES
// ===============================

app.use(
  "/api/doctors",
  doctorRoutes
);

// ===============================
// PATIENT ROUTES
// ===============================

app.use(
  "/api/patients",
  patientRoutes
);

// ===============================
// APPOINTMENT ROUTES
// ===============================

app.use(
  "/api/appointments",
  appointmentRoutes
);

// ===============================
// PRESCRIPTION ROUTES
// ===============================

app.use(
  "/api/prescriptions",
  prescriptionRoutes
);

// ===============================
// DOCTOR PAYMENT ROUTES
// ===============================

app.use(
  "/api/doctorPayments",
  doctorPaymentRoutes
);

// ===============================
// MEDICAL REPORT ROUTES
// ===============================

app.use(
  "/api/medical-reports",
  medicalReportsRoutes
);

// ===============================
// REPORT ALIAS
// ===============================

app.use(
  "/api/reports",
  medicalReportsRoutes
);

// ===============================
// CHAT / MESSAGES
// ===============================

app.use(
  "/api/messages",
  messageRoutes
);

// ===============================
// NOTIFICATIONS
// ===============================

app.use(
  "/api/notifications",
  notificationRoutes
);

// ===============================
// PATIENT ONLINE STATUS
// ===============================

app.use(
  "/api/patientOnlineStatus",
  patientOnlineStatusRoutes
);

// ===============================
// HEALTH TRENDS
// ===============================

app.use(
  "/api/health-trends",
  healthTrendsRoutes
);

// ===============================
// AI INTEGRATION
// ===============================

app.use(
  "/api/ai-integration",
  aiIntergrationRoutes
);

// ===============================
// AI SUMMARY
// ===============================

app.use(
  "/api/ai-summary",
  aiSummaryRoutes
);

// ===============================
// AI SUGGESTIONS
// ===============================

app.use(
  "/api/ai-suggestions",
  aiSuggestionsRoutes
);

// ===============================
// AI MEMORY
// ===============================

app.use(
  "/api/ai-memory",
  aiMemoryRoutes
);

// ===============================
// 404 HANDLER
// ===============================

app.use((req, res) => {
  console.warn(
    `❌ Route not found: ${req.method} ${req.originalUrl}`
  );

  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    path: req.originalUrl,
    method: req.method,
  });
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================

app.use((error, req, res, next) => {
  console.error("======================================");
  console.error("❌ GLOBAL ERROR");
  console.error(error);
  console.error("======================================");

  // CORS error
  if (
    error.message &&
    error.message.toLowerCase().includes("cors")
  ) {
    return res.status(403).json({
      success: false,
      message: "CORS policy blocked this request",
      error:
        NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }

  res.status(error.status || 500).json({
    success: false,
    message:
      error.message || "Internal server error",
    error:
      NODE_ENV === "development"
        ? error.stack
        : undefined,
  });
});

// ===============================
// EXPORT
// ===============================

export default app;