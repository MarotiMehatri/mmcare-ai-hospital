import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import setupSocket from "./socket/socketHandler.js";
import connectDB from "./config/db.js";

const PORT = Number(process.env.PORT) || 8000;

const CLIENT_URL =
  process.env.CLIENT_URL ||
  "http://localhost:5173";

const server = http.createServer(app);

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
    credentials: true,
  },
});

setupSocket(io);

const startServer = async () => {
  try {
    await connectDB();

    console.log("✅ MongoDB connection established");

    server.listen(PORT, () => {
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
        `🔗 Client: ${CLIENT_URL}`
      );
    });
  } catch (error) {
    console.error(
      "❌ Failed to start server:",
      error
    );

    process.exit(1);
  }
};

startServer();