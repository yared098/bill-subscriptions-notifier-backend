const cron = require("node-cron");

const Bill = require("../../bills/models/bill.model");
const Subscription = require("../../subscriptions/models/subscription.model");

const { notifyUser } = require("../services/notification.service");

// RUN EVERY DAY AT 8 AM
cron.schedule("0 8 * * *", async () => {
  console.log("🔔 Running smart notifications...");

  try {
    const today = new Date();

    const next3Days = new Date();
    next3Days.setDate(today.getDate() + 3);

    // =========================
    // 1. BILL REMINDERS
    // =========================
    const upcomingBills = await Bill.find({
      dueDate: {
        $gte: today,
        $lte: next3Days,
      },
      status: "unpaid",
    });

    for (const bill of upcomingBills) {
      await notifyUser({
        userId: bill.userId,
        title: "Bill Reminder",
        message: `${bill.title} is due soon`,
        type: "bill",
      });
    }

    // =========================
    // 2. SUBSCRIPTION REMINDERS
    // =========================
    const upcomingSubscriptions = await Subscription.find({
      renewalDate: {
        $gte: today,
        $lte: next3Days,
      },
      status: "active",
    });

    for (const sub of upcomingSubscriptions) {
      await notifyUser({
        userId: sub.userId,
        title: "Subscription Renewal",
        message: `${sub.serviceName} will renew soon`,
        type: "subscription",
      });
    }

    console.log("✅ Notifications processed successfully");
  } catch (error) {
    console.error("❌ Reminder job error:", error.message);
  }
});