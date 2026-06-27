import socket from "../../sockets/socket";

export const connectAI = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectAI = () => {
  socket.disconnect();
};

export const requestAISummary = (patientId) => {
  socket.emit("request-ai-summary", { patientId });
};

export const listenAISummary = (callback) => {
  socket.on("ai-summary-response", callback);
};

export const removeAISummaryListener = () => {
  socket.off("ai-summary-response");
};
