import registerAISocket from "./aiSocket.js";
import { addUser, removeUser, getOnlineUsers } from "./onlineUsers.js";

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("user_online", ({ userId, role }) => {
      addUser(userId, socket.id, role);
      io.emit("online_users", getOnlineUsers());
    });

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room: ${roomId}`);
    });

    socket.on("send_message", (messageData) => {
      socket.to(messageData.roomId).emit("receive_message", messageData);
    });

    socket.on("typing", ({ roomId, sender }) => {
      socket.to(roomId).emit("typing", { roomId, sender });
    });

    socket.on("stop_typing", ({ roomId }) => {
      socket.to(roomId).emit("stop_typing", { roomId });
    });

    socket.on("message_seen", ({ roomId, messageIds }) => {
      socket.to(roomId).emit("message_seen_update", { roomId, messageIds });
    });

    registerAISocket(io, socket);

    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("online_users", getOnlineUsers());
      console.log("Socket disconnected:", socket.id);
    });
  });
};

export default setupSocket;
