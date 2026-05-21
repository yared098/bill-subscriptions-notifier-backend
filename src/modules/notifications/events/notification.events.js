const { notifyUser } = require("../services/notification.service");

// ===============================
// BILL CREATED
// ===============================
const onBillCreated = async (bill, orgName) => {
  await notifyUser({
    userId: bill.userId,
    title: "New Bill Added",
    message: `${orgName} added a bill: ${bill.title}`,
    type: "bill",
  });
};

// ===============================
// SUBSCRIPTION CREATED
// ===============================
const onSubscriptionCreated = async (sub, orgName) => {
  await notifyUser({
    userId: sub.userId,
    title: "Subscription Added",
    message: `${orgName} subscribed you to ${sub.serviceName}`,
    type: "subscription",
  });
};

// ===============================
// EXCEL IMPORT BATCH
// ===============================
const onExcelUpload = async (users, orgName) => {
  for (const u of users) {
    await notifyUser({
      userId: u.userId,
      title: "New Billing System Added",
      message: `${orgName} added you to billing system`,
      type: "organization",
    });
  }
};

module.exports = {
  onBillCreated,
  onSubscriptionCreated,
  onExcelUpload,
};