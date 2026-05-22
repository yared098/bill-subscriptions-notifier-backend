const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./modules/auth/routes/organization.routes");
const billRoutes = require("./modules/bills/routes/bill.routes");
const subscriptionRoutes = require("./modules/subscriptions/routes/subscription.routes");
const notificationRoutes = require("./modules/notifications/routes/notification.routes");
const dashboardRoutes = require("./modules/dashboard/routes/dashboard.routes");
const analyticsRoutes = require("./modules/analytics/routes/analytics.routes");
const paymentRoutes = require("./modules/payments/routes/payment.routes");
const userRoutes = require("./modules/auth/routes/user.routes");
const organizationRoutes = require("./modules/auth/routes/organization.routes");

const app = express();

// BODY
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// SECURITY
app.use(helmet());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// RATE LIMIT
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, try again later.",
  },
}));

// LOGGING
app.use(morgan("dev"));

// ROUTES
app.use("/api/auth", authRoutes);
// USERS
app.use("/api/users", userRoutes);
app.use("/api/organization",organizationRoutes)
app.use("/api/bills", billRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);

module.exports = app;