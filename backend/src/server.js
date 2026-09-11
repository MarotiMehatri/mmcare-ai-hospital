import "dotenv/config";

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import setupSocket from "./socket/socketHandler.js";
import connectDB from "./config/db.js";

const PORT =
  Number(process.env.PORT) || 8000;

const CLIENT_URL =
  process.env.CLIENT_URL ||
  "http://localhost:5173";

console.log(
  "🚀 MMCare AI Hospital backend starting..."
);

const server = http.createServer(app);

// ============================================================
// SOCKET.IO
// ============================================================

const socketAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://mmcare-ai-hospital.vercel.app",
  CLIENT_URL,
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: socketAllowedOrigins,
    methods: ["GET", "POST"],
    credentials: false,
  },
});

setupSocket(io);

// ============================================================
// START SERVER
// ============================================================

const startServer = async () => {
  try {
    await connectDB();

    console.log(
      "✅ MongoDB connection established"
    );

    server.listen(PORT, () => {
      console.log("");
      console.log(
        "========================================"
      );
      console.log(
        "       MMCARE AI HOSPITAL BACKEND"
      );
      console.log(
        "========================================"
      );

      console.log(
        `🚀 Server: http://localhost:${PORT}`
      );

      console.log(
        `🌐 API: http://localhost:${PORT}/api`
      );

      console.log(
        `❤️ Health: http://localhost:${PORT}/health`
      );

      console.log(
        `🔌 Socket.IO: http://localhost:${PORT}`
      );

      console.log(
        `📁 Uploads: http://localhost:${PORT}/uploads`
      );

      console.log(
        `🔗 Client: ${CLIENT_URL}`
      );

      console.log(
        `🌍 Environment: ${
          process.env.NODE_ENV ||
          "development"
        }`
      );

      console.log(
        "========================================"
      );

      console.log("");
    });

    server.on(
      "error",
      (error) => {
        console.error(
          "❌ HTTP Server Error:",
          error
        );

        if (
          error.code === "EADDRINUSE"
        ) {
          console.error(
            `❌ Port ${PORT} is already being used.`
          );

          console.error(
            "💡 Stop the existing server."
          );
        }

        process.exit(1);
      }
    );
  } catch (error) {
    console.error("");
    console.error(
      "========================================"
    );
    console.error(
      "❌ SERVER STARTUP FAILED"
    );
    console.error(
      "========================================"
    );
    console.error(error);
    console.error(
      "========================================"
    );

    process.exit(1);
  }
};

// ============================================================
// PROCESS ERROR HANDLERS
// ============================================================

process.on(
  "unhandledRejection",
  (reason) => {
    console.error(
      "❌ Unhandled Promise Rejection:"
    );

    console.error(reason);
  }
);

process.on(
  "uncaughtException",
  (error) => {
    console.error(
      "❌ Uncaught Exception:"
    );

    console.error(error);

    process.exit(1);
  }
);

// ============================================================
// START
// ============================================================

startServer();