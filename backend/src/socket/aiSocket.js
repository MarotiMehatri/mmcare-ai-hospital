import { generateHealthSummary } from "../services/geminiService.js";

export default function registerAISocket(io, socket) {
  io.on("connection", (socket) => {
    console.log("Client Connected");

    socket.on("request-ai-summary", async ({ patientId }) => {
      console.log("Patient ID:", patientId);
      try {
        const summary = await generateHealthSummary(patientId);

        console.log("Generated Summary:");
        console.log(summary);
        socket.emit("ai-summary-response", summary);
      } catch (error) {
        console.log(error);
      }
    });
  });
}
