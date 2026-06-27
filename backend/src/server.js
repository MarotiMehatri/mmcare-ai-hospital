import "dotenv/config";
console.log("🚀 MMCare backend server.js started");

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import setupSocket from "./socket/socketHandler.js";

const server = http.createServer(app);

const socketAllowedOrigins = [
  "http://localhost:5173",
  "https://mmcare-ai-hospital.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: socketAllowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

setupSocket(io);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
  console.log(
    `Client URL: ${process.env.CLIENT_URL || "http://localhost:5173"}`,
  );
  console.log(
    `JSON Server URL: ${process.env.JSON_SERVER_URL || "http://localhost:5001"}`,
  );
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
