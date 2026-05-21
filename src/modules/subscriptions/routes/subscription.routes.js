const express = require("express");

const router = express.Router();

const subscriptionController = require(
  "../controllers/subscription.controller"
);

const {
  protect,
} = require("../../auth/middlewares/auth.middleware");
router.post("/", protect, subscriptionController.createSubscription);

// USER ONLY
router.get("/my", protect, subscriptionController.getMySubscriptions);

router.patch("/:id/unsubscribe", protect, subscriptionController.unsubscribe);

// ORGANIZATION ONLY
router.get(
  "/organization",
  protect,
  subscriptionController.getOrganizationSubscriptions
);

module.exports = router;