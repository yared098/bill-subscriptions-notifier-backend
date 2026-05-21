const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
    });
  });

  return io;
};

const sendToUser = (userId, data) => {
  if (io) {
    io.to(userId).emit("notification", data);
  }
};

module.exports = {
  initSocket,
  sendToUser,
};