const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment.controller");
const { protect } = require("../../auth/middlewares/auth.middleware");

// =========================
// SINGLE PAYMENT
// =========================
router.post("/", protect, paymentController.createPayment);

// =========================
// PAY ALL TODAY BILLS
// =========================
router.post("/pay-all-bills-today", protect, paymentController.payAllBillsToday);

// =========================
// PAY ALL SUBSCRIPTIONS TODAY
// =========================
router.post("/pay-all-subscriptions-today", protect, paymentController.payAllSubscriptionsToday);

module.exports = router;