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

    // join personal room
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User joined room: ${userId}`);
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
  if (!io) return;

  io.to(userId).emit("notification", {
    ...data,
    timestamp: new Date(),
  });
};

module.exports = {
  initSocket,
  sendToUser,
};