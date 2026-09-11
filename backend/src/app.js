import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// ============================================================
// ROUTES
// ============================================================

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

// ============================================================
// CREATE EXPRESS APP
// ============================================================

const app = express();

// ============================================================
// CORS
// ============================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://mmcare-ai-hospital.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin
      // Example: Postman / server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`⚠️ CORS blocked origin: ${origin}`);

      return callback(new Error("Not allowed by CORS"));
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
    ],

    optionsSuccessStatus: 200,
  })
);

// ============================================================
// PREFLIGHT
// ============================================================

app.options(
  /.*/,
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
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
    ],
  })
);

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
    limit: "50mb",
    extended: true,
  })
);

// ============================================================
// COOKIE PARSER
// ============================================================

app.use(cookieParser());

// ============================================================
// STATIC FILES
// MEDICAL REPORT UPLOADS
// ============================================================
//
// Physical folder:
//
// backend/
// └── uploads/
//     └── reports/
//         └── CBC.png
//
// Browser URL:
//
// http://localhost:8000/uploads/reports/CBC.png
//
// ============================================================

const uploadsDirectory = path.join(
  process.cwd(),
  "uploads"
);

app.use(
  "/uploads",
  express.static(uploadsDirectory)
);

console.log(
  `📁 Static uploads directory: ${uploadsDirectory}`
);

// ============================================================
// HOME
// GET /
// ============================================================

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message:
      "MMCare AI Hospital API Running Successfully 🚀",
    environment:
      process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// HEALTH CHECK
// GET /health
// ============================================================

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    status: "OK",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// API ROUTES
// ============================================================

// ------------------------------------------------------------
// USERS
// ------------------------------------------------------------

app.use(
  "/api/users",
  usersRoutes
);

// ------------------------------------------------------------
// DOCTORS
// ------------------------------------------------------------

app.use(
  "/api/doctors",
  doctorRoutes
);

// ------------------------------------------------------------
// PATIENTS
// ------------------------------------------------------------

app.use(
  "/api/patients",
  patientRoutes
);

// ------------------------------------------------------------
// APPOINTMENTS
// ------------------------------------------------------------

app.use(
  "/api/appointments",
  appointmentRoutes
);

// ------------------------------------------------------------
// PRESCRIPTIONS
// ------------------------------------------------------------

app.use(
  "/api/prescriptions",
  prescriptionRoutes
);

// ------------------------------------------------------------
// DOCTOR PAYMENTS
// ------------------------------------------------------------

app.use(
  "/api/doctorPayments",
  doctorPaymentRoutes
);

app.use("/api/medical-reports", medicalReportsRoutes);

// ------------------------------------------------------------
// MEDICAL REPORTS
// ------------------------------------------------------------
//
// GET    /api/reports
// GET    /api/reports/:id
// GET    /api/reports/patient/:patientId
// POST   /api/reports
// PUT    /api/reports/:id
// DELETE /api/reports/:id
//
// ------------------------------------------------------------

app.use(
  "/api/reports",
  medicalReportsRoutes
);

// ------------------------------------------------------------
// MESSAGES / CHAT
// ------------------------------------------------------------

app.use(
  "/api/messages",
  messageRoutes
);

// ------------------------------------------------------------
// NOTIFICATIONS
// ------------------------------------------------------------

app.use(
  "/api/notifications",
  notificationRoutes
);

// ------------------------------------------------------------
// PATIENT ONLINE STATUS
// ------------------------------------------------------------

app.use(
  "/api/patientOnlineStatus",
  patientOnlineStatusRoutes
);

// ------------------------------------------------------------
// HEALTH TRENDS
// ------------------------------------------------------------

app.use(
  "/api/health-trends",
  healthTrendsRoutes
);

// ------------------------------------------------------------
// AI INTEGRATION
// ------------------------------------------------------------

app.use(
  "/api/ai-integration",
  aiIntergrationRoutes
);

// ------------------------------------------------------------
// AI SUMMARY
// ------------------------------------------------------------

app.use(
  "/api/ai-summary",
  aiSummaryRoutes
);

// ------------------------------------------------------------
// AI SUGGESTIONS
// ------------------------------------------------------------

app.use(
  "/api/ai-suggestions",
  aiSuggestionsRoutes
);

// ------------------------------------------------------------
// AI MEMORY
// ------------------------------------------------------------

app.use(
  "/api/ai-memory",
  aiMemoryRoutes
);

// ============================================================
// 404 HANDLER
// MUST BE LAST
// ============================================================

app.use((req, res) => {
  console.warn(
    `⚠️ Route not found: ${req.method} ${req.originalUrl}`
  );

  return res.status(404).json({
    success: false,
    message:
      `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use((err, req, res, next) => {
  console.error(
    "💥 Unhandled Express Error:"
  );

  console.error(err);

  return res.status(
    err.status ||
      err.statusCode ||
      500
  ).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
});

// ============================================================
// EXPORT APP
// ============================================================

export default app;