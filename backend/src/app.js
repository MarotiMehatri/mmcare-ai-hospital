import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// ============================================================
// ROUTES
// ============================================================

// User
import usersRoutes from "./Routes/user/usersRoutes.js";

// Doctor
import doctorRoutes from "./Routes/Doctor/doctorRoutes.js";
import doctorPaymentRoutes from "./Routes/Doctor/doctorPaymentRoutes.js";

// Patient
import patientRoutes from "./Routes/patinet/patientRoutes.js";
import patientOnlineStatusRoutes from "./Routes/patinet/patientOnlineStatusRoutes.js";

// Appointment
import appointmentRoutes from "./Routes/appointment/appointmentRoutes.js";

// Prescription
import prescriptionRoutes from "./Routes/prescription/prescriptionRoutes.js";

// Reports
import medicalReportsRoutes from "./Routes/report/medicalReportsRoutes.js";

// Chat
import messageRoutes from "./Routes/chat/messageRoutes.js";

// Notifications
import notificationRoutes from "./Routes/notification/notificationRoutes.js";

// Health Trends
import healthTrendsRoutes from "./Routes/healthTrends/healthTrendsRoutes.js";

// AI
import aiIntergrationRoutes from "./Routes/ai/aiIntegrationRoutes.js";
import aiSummaryRoutes from "./Routes/ai/aiSummaryRoutes.js";
import aiSuggestionsRoutes from "./Routes/ai/aiSuggestionsRoutes.js";
import aiMemoryRoutes from "./Routes/ai/aiMemoryRoutes.js";

// ============================================================
// CREATE EXPRESS APPLICATION
// ============================================================

const app = express();

// ============================================================
// ENVIRONMENT
// ============================================================

const NODE_ENV = process.env.NODE_ENV || "development";

// ============================================================
// CORS CONFIGURATION
// ============================================================

const allowedOrigins = [
  // Local Vite frontend
  "http://localhost:5173",

  // Local React development
  "http://localhost:3000",

  // Production frontend
  "https://mmcare-ai-hospital.vercel.app",

  // Environment-based frontend URL
  process.env.CLIENT_URL,
]
  .filter(Boolean)
  .map((origin) => origin.replace(/\/$/, ""));

console.log("==============================================");
console.log("🌐 MMCare AI Hospital Backend");
console.log("==============================================");
console.log("🌍 Environment:", NODE_ENV);
console.log("🌐 Allowed CORS Origins:", allowedOrigins);
console.log("==============================================");

// ============================================================
// CORS OPTIONS
// ============================================================

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without Origin header.
    // Useful for:
    // - Postman
    // - curl
    // - server-to-server requests
    // - health checks
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    console.warn("⚠️ CORS blocked origin:", origin);

    return callback(
      new Error(`CORS blocked origin: ${origin}`)
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
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
    "X-Requested-With",
  ],

  optionsSuccessStatus: 204,
};

// ============================================================
// CORS MIDDLEWARE
// IMPORTANT: Must be before routes
// ============================================================

app.use(cors(corsOptions));

// Explicit OPTIONS / preflight support
app.options("*", cors(corsOptions));

// ============================================================
// BODY PARSERS
// ============================================================

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

// ============================================================
// COOKIE PARSER
// ============================================================

app.use(cookieParser());

// ============================================================
// STATIC UPLOADS
// ============================================================

const uploadsDirectory = path.join(
  process.cwd(),
  "uploads"
);

console.log(
  "📁 Uploads directory:",
  uploadsDirectory
);

app.use(
  "/uploads",
  express.static(uploadsDirectory)
);

// ============================================================
// REQUEST LOGGER
// ============================================================

app.use((req, res, next) => {
  console.log(
    `➡️ ${req.method} ${req.originalUrl}`
  );

  next();
});

// ============================================================
// ROOT API
// ============================================================

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message:
      "MMCare AI Hospital API Running Successfully 🚀",
    service: "MMCare AI Hospital Backend",
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    status: "OK",
    message: "Server is healthy ❤️",
    service: "MMCare AI Hospital Backend",
    environment: NODE_ENV,
    database:
      process.env.MONGODB_URI
        ? "MongoDB configured"
        : "MongoDB URI missing",
    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// API ROOT
// ============================================================

app.get("/api", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "MMCare AI Hospital API",
    version: "1.0.0",
    environment: NODE_ENV,

    endpoints: {
      users: "/api/users",
      doctors: "/api/doctors",
      patients: "/api/patients",
      appointments: "/api/appointments",
      prescriptions: "/api/prescriptions",
      doctorPayments: "/api/doctorPayments",
      medicalReports: "/api/medical-reports",
      reports: "/api/reports",
      messages: "/api/messages",
      notifications: "/api/notifications",
      patientOnlineStatus:
        "/api/patientOnlineStatus",
      healthTrends: "/api/health-trends",
      aiIntegration: "/api/ai-integration",
      aiSummary: "/api/ai-summary",
      aiSuggestions: "/api/ai-suggestions",
      aiMemory: "/api/ai-memory",
    },

    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// USER ROUTES
// ============================================================

app.use(
  "/api/users",
  usersRoutes
);

// ============================================================
// DOCTOR ROUTES
// ============================================================

app.use(
  "/api/doctors",
  doctorRoutes
);

// ============================================================
// PATIENT ROUTES
// ============================================================

app.use(
  "/api/patients",
  patientRoutes
);

// ============================================================
// APPOINTMENT ROUTES
// ============================================================

app.use(
  "/api/appointments",
  appointmentRoutes
);

// ============================================================
// PRESCRIPTION ROUTES
// ============================================================

app.use(
  "/api/prescriptions",
  prescriptionRoutes
);

// ============================================================
// DOCTOR PAYMENT ROUTES
// ============================================================

app.use(
  "/api/doctorPayments",
  doctorPaymentRoutes
);

// ============================================================
// MEDICAL REPORT ROUTES
// ============================================================

// Main route
app.use(
  "/api/medical-reports",
  medicalReportsRoutes
);

// Backward-compatible reports route
app.use(
  "/api/reports",
  medicalReportsRoutes
);

// ============================================================
// CHAT / MESSAGE ROUTES
// ============================================================

app.use(
  "/api/messages",
  messageRoutes
);

// ============================================================
// NOTIFICATION ROUTES
// ============================================================

app.use(
  "/api/notifications",
  notificationRoutes
);

// ============================================================
// PATIENT ONLINE STATUS ROUTES
// ============================================================

app.use(
  "/api/patientOnlineStatus",
  patientOnlineStatusRoutes
);

// ============================================================
// HEALTH TRENDS ROUTES
// ============================================================

app.use(
  "/api/health-trends",
  healthTrendsRoutes
);

// ============================================================
// AI INTEGRATION ROUTES
// ============================================================

app.use(
  "/api/ai-integration",
  aiIntergrationRoutes
);

// ============================================================
// AI HEALTH SUMMARY ROUTES
// ============================================================

app.use(
  "/api/ai-summary",
  aiSummaryRoutes
);

// ============================================================
// AI SUGGESTIONS ROUTES
// ============================================================

app.use(
  "/api/ai-suggestions",
  aiSuggestionsRoutes
);

// ============================================================
// AI MEMORY ROUTES
// ============================================================

app.use(
  "/api/ai-memory",
  aiMemoryRoutes
);

// ============================================================
// 404 HANDLER
// IMPORTANT: MUST BE AFTER ALL ROUTES
// ============================================================

app.use((req, res) => {
  console.warn(
    `⚠️ Route not found: ${req.method} ${req.originalUrl}`
  );

  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    path: req.originalUrl,
    method: req.method,
  });
});

// ============================================================
// GLOBAL ERROR HANDLER
// IMPORTANT: MUST BE LAST
// ============================================================

app.use((err, req, res, next) => {
  console.error("==============================================");
  console.error("💥 EXPRESS ERROR");
  console.error("==============================================");
  console.error("Method:", req.method);
  console.error("URL:", req.originalUrl);
  console.error("Error:", err);
  console.error("==============================================");

  // ----------------------------------------------------------
  // CORS ERROR
  // ----------------------------------------------------------

  if (
    err.message &&
    err.message.startsWith(
      "CORS blocked origin:"
    )
  ) {
    return res.status(403).json({
      success: false,
      message: err.message,
    });
  }

  // ----------------------------------------------------------
  // DEFAULT ERROR
  // ----------------------------------------------------------

  const statusCode =
    err.status ||
    err.statusCode ||
    500;

  return res.status(statusCode).json({
    success: false,

    message:
      err.message ||
      "Internal Server Error",

    ...(NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
});

// ============================================================
// EXPORT EXPRESS APP
// ============================================================

export default app;