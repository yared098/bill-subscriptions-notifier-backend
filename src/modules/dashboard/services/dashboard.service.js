// const Bill = require("../../bills/models/bill.model");
// const Subscription = require("../../subscriptions/models/subscription.model");

// const getDashboardData = async (userId) => {
//   const today = new Date();

//   const next7Days = new Date();
//   next7Days.setDate(today.getDate() + 7);

//   // =========================
//   // 1. ALL BILLS
//   // =========================
//   const bills = await Bill.find({ userId });

//   const totalBillExpense = bills.reduce(
//     (sum, b) => sum + b.amount,
//     0
//   );

//   const unpaidBills = bills.filter(
//     (b) => b.status === "unpaid"
//   );

//   const upcomingBills = bills.filter(
//     (b) =>
//       b.status === "unpaid" &&
//       b.dueDate >= today &&
//       b.dueDate <= next7Days
//   );

//   // =========================
//   // 2. SUBSCRIPTIONS
//   // =========================
//   const subscriptions = await Subscription.find({
//     userId,
//   });

//   const totalSubscriptionExpense =
//     subscriptions.reduce((sum, s) => sum + s.amount, 0);

//   const activeSubscriptions = subscriptions.filter(
//     (s) => s.status === "active"
//   );

//   const upcomingSubscriptions = subscriptions.filter(
//     (s) =>
//       s.status === "active" &&
//       s.renewalDate >= today &&
//       s.renewalDate <= next7Days
//   );

//   // =========================
//   // 3. FINAL RESPONSE
//   // =========================
//   return {
//     totalMonthlyExpenses:
//       totalBillExpense + totalSubscriptionExpense,

//     totalBills: totalBillExpense,
//     totalSubscriptions: totalSubscriptionExpense,

//     unpaidBillsCount: unpaidBills.length,

//     upcomingBills,
//     upcomingSubscriptions,

//     activeSubscriptions: activeSubscriptions.length,

//     recentBills: bills.slice(-5),
//     recentSubscriptions: subscriptions.slice(-5),
//   };
// };

// module.exports = {
//   getDashboardData,
// };

const Bill = require("../../bills/models/bill.model");
const Subscription = require("../../subscriptions/models/subscription.model");

const getDashboardData = async (userId) => {
  const today = new Date();

  const next7Days = new Date();
  next7Days.setDate(today.getDate() + 7);

  const next30Days = new Date();
  next30Days.setDate(today.getDate() + 30);

  // =========================
  // FETCH DATA
  // =========================
  const bills = await Bill.find({ userId }).sort({
    createdAt: -1,
  });

  const subscriptions = await Subscription.find({
    userId,
  }).sort({
    createdAt: -1,
  });

  // =========================
  // BILL CALCULATIONS
  // =========================
  const totalBillExpense = bills.reduce(
    (sum, bill) => sum + bill.amount,
    0
  );

  const paidBills = bills.filter(
    (bill) => bill.status === "paid"
  );

  const unpaidBills = bills.filter(
    (bill) => bill.status === "unpaid"
  );

  const upcomingBills = unpaidBills.filter(
    (bill) =>
      new Date(bill.dueDate) >= today &&
      new Date(bill.dueDate) <= next7Days
  );

  const overdueBills = unpaidBills.filter(
    (bill) => new Date(bill.dueDate) < today
  );

  // =========================
  // SUBSCRIPTION CALCULATIONS
  // =========================
  const totalSubscriptionExpense =
    subscriptions.reduce(
      (sum, sub) => sum + sub.amount,
      0
    );

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === "active"
  );

  const cancelledSubscriptions =
    subscriptions.filter(
      (sub) => sub.status === "cancelled"
    );

  const upcomingSubscriptions =
    activeSubscriptions.filter(
      (sub) =>
        new Date(sub.renewalDate) >= today &&
        new Date(sub.renewalDate) <= next7Days
    );

  const monthlySubscriptions =
    subscriptions.filter(
      (sub) => sub.billingCycle === "monthly"
    );

  const yearlySubscriptions =
    subscriptions.filter(
      (sub) => sub.billingCycle === "yearly"
    );

  // =========================
  // CATEGORY ANALYTICS
  // =========================
  const billCategories = {};

  bills.forEach((bill) => {
    if (!billCategories[bill.category]) {
      billCategories[bill.category] = 0;
    }

    billCategories[bill.category] += bill.amount;
  });

  const subscriptionCategories = {};

  subscriptions.forEach((sub) => {
    if (!subscriptionCategories[sub.category]) {
      subscriptionCategories[sub.category] = 0;
    }

    subscriptionCategories[sub.category] += sub.amount;
  });

  // =========================
  // UPCOMING EXPENSES
  // =========================
  const upcoming30DaysBills = unpaidBills.filter(
    (bill) =>
      new Date(bill.dueDate) >= today &&
      new Date(bill.dueDate) <= next30Days
  );

  const upcoming30DaysSubscriptions =
    activeSubscriptions.filter(
      (sub) =>
        new Date(sub.renewalDate) >= today &&
        new Date(sub.renewalDate) <= next30Days
    );

  const upcomingExpenseTotal =
    upcoming30DaysBills.reduce(
      (sum, bill) => sum + bill.amount,
      0
    ) +
    upcoming30DaysSubscriptions.reduce(
      (sum, sub) => sum + sub.amount,
      0
    );

  // =========================
  // FINAL RESPONSE
  // =========================
  return {
    summary: {
      totalMonthlyExpenses:
        totalBillExpense +
        totalSubscriptionExpense,

      totalBillsExpense: totalBillExpense,

      totalSubscriptionsExpense:
        totalSubscriptionExpense,

      totalBills: bills.length,

      totalSubscriptions:
        subscriptions.length,

      paidBills: paidBills.length,

      unpaidBills: unpaidBills.length,

      overdueBills: overdueBills.length,

      activeSubscriptions:
        activeSubscriptions.length,

      cancelledSubscriptions:
        cancelledSubscriptions.length,

      upcomingExpenseTotal,
    },

    upcoming: {
      upcomingBills,
      upcomingSubscriptions,
    },

    recentActivities: {
      recentBills: bills.slice(0, 5),
      recentSubscriptions:
        subscriptions.slice(0, 5),
    },

    analytics: {
      billCategories,
      subscriptionCategories,

      monthlySubscriptions:
        monthlySubscriptions.length,

      yearlySubscriptions:
        yearlySubscriptions.length,
    },

    warnings: {
      hasOverdueBills:
        overdueBills.length > 0,

      hasUpcomingPayments:
        upcomingBills.length > 0 ||
        upcomingSubscriptions.length > 0,
    },
  };
};

module.exports = {
  getDashboardData,
};