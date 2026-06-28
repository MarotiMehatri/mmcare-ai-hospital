import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import usersRoutes from "./Routes/usersRoutes.js";
import doctorRoutes from "./Routes/doctorRoutes.js";
import patientRoutes from "./Routes/patientRoutes.js";
import healthTrendsRoutes from "./Routes/healthTrends/healthTrendsRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
import notificationRoutes from "./Routes/notificationRoutes.js";
import appointmentRoutes from "./Routes/appointmentRoutes.js";
import prescriptionRoutes from "./Routes/prescriptionRoutes.js";
import doctorPaymentRoutes from "./Routes/doctorPaymentRoutes.js";
import medicalReportsRoutes from "./Routes/medicalReportsRoutes.js";
import patientOnlineStatusRoutes from "./Routes/patientOnlineStatusRoutes.js";
import reportRoutes from "./Routes/reportRoutes.js";
import aiSuggestionsRoutes from "./Routes/aiSuggestionsRoutes.js";
import aiMemoryRoutes from "./Routes/aiMemoryRoutes.js";

const app = express();

/* =========================
   CORS CONFIG
========================= */

app.use(
  cors({
    origin: true,
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  }),
);

app.options(/.*/, cors());

/* =========================
   MIDDLEWARES
========================= */

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

/* =========================
   HOME ROUTES
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MMCare AI Hospital API Running Successfully 🚀",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Server is healthy",
  });
});

/* =========================
   API ROUTES
========================= */

app.use("/users", usersRoutes);
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/messages", messageRoutes);
app.use("/notifications", notificationRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/prescriptions", prescriptionRoutes);
app.use("/doctorPayments", doctorPaymentRoutes);
app.use("/medical-reports", medicalReportsRoutes);
app.use("/patientOnlineStatus", patientOnlineStatusRoutes);
app.use("/reports", reportRoutes);
app.use("/ai-suggestions", aiSuggestionsRoutes);
app.use("/ai-memory", aiMemoryRoutes);
app.use("/api/health-trends", healthTrendsRoutes);

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error("💥 Unhandled Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
