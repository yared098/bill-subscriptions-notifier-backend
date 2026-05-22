require("dotenv").config();

const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const connectDB = require("./config/db");
const { initSocket } = require("./config/socket");

const logger = require("./utils/log");

const PORT = process.env.PORT || 5000;

// =========================
// CREATE SINGLE SERVER
// =========================
const server = http.createServer(app);

// =========================
// INIT SOCKET ON SAME SERVER
// =========================
initSocket(server);

// =========================
// CONNECT DB + START SERVER
// =========================
connectDB();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // await seedData();

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));