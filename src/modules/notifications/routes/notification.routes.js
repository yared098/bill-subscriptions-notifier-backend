const express = require("express");

const router = express.Router();

const notificationController = require(
  "../controllers/notification.controller"
);

const {
  protect,
  organizationOnly, // ✅ IMPORT THIS
} = require("../../auth/middlewares/auth.middleware");

// =========================
// USER ROUTES
// =========================
router.get(
  "/",
  protect,
  notificationController.getNotifications
);

router.put(
  "/:id/read",
  protect,
  notificationController.markAsRead
);

// =========================
// ORGANIZATION ONLY ROUTES
// =========================
router.post(
  "/notify/subscribers",
  protect,
  organizationOnly, // ✅ ADD HERE
  notificationController.notifySubscribers
);

router.post(
  "/notify/bill",
  protect,
  organizationOnly, // ✅ ADD HERE
  notificationController.notifyBill
);

module.exports = router;