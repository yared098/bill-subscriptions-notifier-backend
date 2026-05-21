const express = require("express");

const router = express.Router();

const notificationController = require(
  "../controllers/notification.controller"
);

const {
  protect,
} = require("../../auth/middlewares/auth.middleware");

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

module.exports = router;