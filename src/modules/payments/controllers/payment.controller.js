const paymentService = require("../services/payment.service");

// =========================
// SINGLE PAYMENT
// =========================
const createPayment = async (req, res) => {
  try {
    const result = await paymentService.createPayment(req.body, req.user);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// PAY ALL BILLS TODAY
// =========================
const payAllBillsToday = async (user, data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bills = await Bill.find({
    userId: user.id,
    dueDate: {
      $lte: today,
    },
    status: "unpaid",
  });

  if (bills.length === 0) {
    throw new Error("No bills to pay today");
  }

  const total = bills.reduce((sum, b) => sum + b.amount, 0);

  const reference = `BILL-PAYALL-${Date.now()}`;

  const payment = await Payment.create({
    userId: user.id,
    amount: total,
    provider: data.provider,
    purpose: "bill",
    reference,
  });

  if (data.provider === "chapa") {
    const chapa = await initializeChapaPayment({
      amount: total,
      email: user.email,
      reference,
      callbackUrl: "http://localhost:5000/api/payments/verify",
    });

    return {
      payment,
      billsCount: bills.length,
      checkoutUrl: chapa.data.checkout_url,
    };
  }

  return { payment, billsCount: bills.length };
};

// =========================
// PAY ALL SUBSCRIPTIONS TODAY
// =========================
const payAllSubscriptionsToday = async (user, data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const subscriptions = await Subscription.find({
    userId: user.id,
    status: "active",
  });

  if (subscriptions.length === 0) {
    throw new Error("No subscriptions to pay");
  }

  const total = subscriptions.reduce((sum, s) => sum + s.amount, 0);

  const reference = `SUB-PAYALL-${Date.now()}`;

  const payment = await Payment.create({
    userId: user.id,
    amount: total,
    provider: data.provider,
    purpose: "subscription",
    reference,
  });

  if (data.provider === "chapa") {
    const chapa = await initializeChapaPayment({
      amount: total,
      email: user.email,
      reference,
      callbackUrl: "http://localhost:5000/api/payments/verify",
    });

    return {
      payment,
      subscriptionsCount: subscriptions.length,
      checkoutUrl: chapa.data.checkout_url,
    };
  }

  return { payment, subscriptionsCount: subscriptions.length };
};
module.exports = {
  createPayment,
  payAllBillsToday,
  payAllSubscriptionsToday,
};