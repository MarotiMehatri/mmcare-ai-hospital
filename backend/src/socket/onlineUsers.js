const onlineUsers = new Map();

export const addUser = (userId, socketId, role) => {
  onlineUsers.set(socketId, {
    userId,
    role,
    socketId,
    connectedAt: new Date().toISOString(),
  });
};

export const removeUser = (socketId) => {
  onlineUsers.delete(socketId);
};

export const getOnlineUsers = () => {
  return Array.from(onlineUsers.values());
};

export const getUserSocketId = (userId) => {
  for (const [socketId, user] of onlineUsers.entries()) {
    if (user.userId === userId) return socketId;
  }
  return null;
};

export const isUserOnline = (userId) => {
  return getOnlineUsers().some((u) => u.userId === userId);
};
