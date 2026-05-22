const { notifyUser } = require("../services/notification.service");
const normalizePhone = (phone) => {
  if (!phone) return null;
  return phone.replace(/\s/g, "").trim();
};
const User = require("../../auth/models/user.model");
const onBillCreated = async (bill, orgName) => {
  try {
    const phone = normalizePhone(bill.customerPhone);

    const user = await User.findOne({ phone });

    if (!user) {
      console.log("⚠ No user found for phone:", phone);
      return;
    }

    // 1. SOCKET + EMAIL + PUSH + DB NOTIF
    await notifyUser({
      userId: user._id,
      title: "New Bill Added",
      message: `${orgName} added a bill: ${bill.title}`,
      type: "bill",
    });

    // 2. OPTIONAL: mark bill linked
    bill.userId = user._id;
    await bill.save();

  } catch (err) {
    console.log("❌ onBillCreated error:", err.message);
  }
};


// ===============================
// SUBSCRIPTION CREATED (PHONE-BASED)
// ===============================
const onSubscriptionCreated = async (sub, orgName) => {
  try {
    const phone = normalizePhone(sub.customerPhone);

    const user = await User.findOne({ phone });

    if (!user) {
      console.log("⚠ No user found for subscription phone:", phone);
      return;
    }

    await notifyUser({
      userId: user._id,
      title: "Subscription Added",
      message: `${orgName} subscribed you to ${sub.serviceName}`,
      type: "subscription",
    });

  } catch (err) {
    console.log("❌ onSubscriptionCreated error:", err.message);
  }
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