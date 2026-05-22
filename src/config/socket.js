const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join", (userId) => {
      if (!userId) return;

      const roomId = userId.toString();

      socket.join(roomId);

      console.log(`🟢 User joined room: ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });

  return io;
};

// =========================
// SEND TO USER ROOM
// =========================
const sendToUser = (userId, data) => {
  if (!io) {
    console.log("❌ Socket not initialized");
    return;
  }

  const roomId = userId?.toString();

  console.log("📡 Sending to room:", roomId);

  io.to(roomId).emit("notification", {
    ...data,
    timestamp: new Date(),
  });
};

module.exports = {
  initSocket,
  sendToUser,
};