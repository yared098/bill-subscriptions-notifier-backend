const Bill = require("../../bills/models/bill.model");
const Subscription = require("../../subscriptions/models/subscription.model");

const getAnalytics = async (userId) => {
  const bills = await Bill.find({ userId });
  const subscriptions = await Subscription.find({ userId });

  // =========================
  // 1. TOTAL EXPENSES
  // =========================
  const totalBills = bills.reduce(
    (sum, b) => sum + b.amount,
    0
  );

  const totalSubscriptions = subscriptions.reduce(
    (sum, s) => sum + s.amount,
    0
  );

  const totalExpense = totalBills + totalSubscriptions;

  // =========================
  // 2. CATEGORY BREAKDOWN (BILLS)
  // =========================
  const categoryMap = {};

  bills.forEach((bill) => {
    if (!categoryMap[bill.category]) {
      categoryMap[bill.category] = 0;
    }

    categoryMap[bill.category] += bill.amount;
  });

  const categoryBreakdown = Object.keys(categoryMap).map(
    (key) => ({
      category: key,
      amount: categoryMap[key],
    })
  );

  // =========================
  // 3. MONTHLY SPENDING (SIMPLE VERSION)
  // =========================
  const monthlyMap = {};

  bills.forEach((bill) => {
    const month = new Date(bill.createdAt).getMonth() + 1;

    if (!monthlyMap[month]) {
      monthlyMap[month] = 0;
    }

    monthlyMap[month] += bill.amount;
  });

  const monthlySpending = Object.keys(monthlyMap).map(
    (key) => ({
      month: key,
      amount: monthlyMap[key],
    })
  );

  // =========================
  // 4. TOP CATEGORY
  // =========================
  let topCategory = null;
  let max = 0;

  for (const key in categoryMap) {
    if (categoryMap[key] > max) {
      max = categoryMap[key];
      topCategory = key;
    }
  }

  // =========================
  // FINAL RESPONSE
  // =========================
  return {
    totalBills,
    totalSubscriptions,
    totalExpense,

    categoryBreakdown,
    monthlySpending,

    insights: {
      topCategory,
      averageMonthlyExpense:
        bills.length > 0
          ? totalBills / bills.length
          : 0,
    },
  };
};

module.exports = {
  getAnalytics,
};