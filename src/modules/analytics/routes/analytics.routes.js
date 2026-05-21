const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

const {
  protect,
} = require("../../auth/middlewares/auth.middleware");

router.get("/", protect, analyticsController.getAnalytics);

module.exports = router;