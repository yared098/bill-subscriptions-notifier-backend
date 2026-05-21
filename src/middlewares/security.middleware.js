const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const cors = require("cors");

// ======================
// CORS CONFIG
// ======================
const corsMiddleware = cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

// ======================
// RATE LIMITING
// ======================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limit each IP
  message: "Too many requests, try again later.",
});

// ======================
// SECURITY EXPORT
// ======================
const securityMiddleware = [
  helmet(),
  corsMiddleware,
  limiter,
  xss(),
];

module.exports = securityMiddleware;