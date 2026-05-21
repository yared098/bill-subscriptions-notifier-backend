const Payment = require("../models/payment.model");
const Bill = require("../../bills/models/bill.model");

const Subscription = require("../../subscriptions/models/subscription.model");
const { initializeChapaPayment } = require("../providers/chapa.provider");

// =========================
// SINGLE PAYMENT
// =========================
const createPayment = async (data, user) => {
  const reference = `PAY-${Date.now()}`;

  const payment = await Payment.create({
    userId: user.id,
    amount: data.amount,
    provider: data.provider,
    purpose: data.purpose,
    reference,
  });

  // Provider: CHAPA
  if (data.provider === "chapa") {
    const chapa = await initializeChapaPayment({
      amount: data.amount,
      email: user.email,
      reference,
      callbackUrl: "http://localhost:5000/api/payments/verify",
    });

    return {
      payment,
      checkoutUrl: chapa.data.checkout_url,
    };
  }

  return payment;
};