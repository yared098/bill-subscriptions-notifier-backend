// services/bill.service.js
const { notifyUser } = require("../../notifications/services/notification.service");
const Bill = require("../models/bill.model");
const { onBillCreated } = require("../../notifications/events/notification.events");

// =======================================
// ORGANIZATION CREATE BILL
// =======================================
const createBill = async (data, user) => {
  const bill = await Bill.create({
    ...data,

    // ✅ REQUIRED BY SCHEMA
    organizationId: user.id,
    organizationName: user.organizationName, // 👈 FIXED

  });
   // =========================
  // 🔔 REAL-TIME NOTIFICATION
  // =========================
  if (bill.userId) {
    await notifyUser({
      userId: bill.userId,
      title: "New Bill Created",
      message: `${bill.title || "A new bill"} has been created`,
      type: "bill",
    });
  }
  // 🔥 THIS is where it runs
   await onBillCreated(bill, user.organizationName);

  return bill;
};
const normalizePhone = (phone) => {
  if (!phone) return null;

  return phone
    .replace(/\s/g, "")
    .replace("+251", "")
    .replace(/^0/, "")
    .trim();
};

// =======================================
// USER GET HIS BILLS
// =======================================
const getUserBills = async (
  userId,
  phone,
  type
) => {

  const filter = {};

  const orConditions = [];

  // =========================
  // MATCH USER ID
  // =========================
  if (userId) {
    orConditions.push({
      userId: userId,
    });
  }

  // =========================
  // MATCH PHONE NUMBER
  // =========================
  if (phone) {
    orConditions.push({
      customerPhone: phone,
    });
  }

  // =========================
  // MUST HAVE MATCH CONDITION
  // =========================
  if (orConditions.length === 0) {
    return [];
  }

  filter.$or = orConditions;

  // =========================
  // TYPE FILTERS
  // =========================
  const now = new Date();

  if (type === "paid") {
    filter.status = "paid";
  }

  if (type === "unpaid") {
    filter.status = "unpaid";
  }

  if (type === "upcoming") {
    filter.status = "unpaid";
    filter.dueDate = {
      $gte: now,
    };
  }
  const bills = await Bill.find(filter).sort({
    dueDate: 1,
  });
  return bills;
};

// =======================================
// ORGANIZATION GET CREATED BILLS (FIXED)
// =======================================
const getOrganizationBills = async (organizationId) => {
  if (!organizationId) return [];

  return await Bill.find({
    organizationId, // ✅ KEEP SIMPLE
  }).sort({ createdAt: -1 });
};


const getBillById = async (billId, user) => {
  if (!billId) return null;

  const query = {
    _id: billId,
    $or: [],
  };

  // =========================
  // USER ACCESS (MOBILE)
  // =========================
  if (user.phone) {
    query.$or.push({
      customerPhone: normalizePhone(user.phone),
    });
  }

  if (user.id) {
    query.$or.push({ userId: user.id });
  }

  // =========================
  // ORGANIZATION ACCESS
  // =========================
  if (user.id) {
    query.$or.push({ organizationId: user.id });
  }

  if (query.$or.length === 0) return null;

  return await Bill.findOne(query);
};

// =======================================
// ONLY ORGANIZATION UPDATE
// =======================================
const updateBill = async (
  billId,
  organizationId,
  data
) => {
  return await Bill.findOneAndUpdate(
    {
      _id: billId,
      organizationId,
    },
    data,
    {
      new: true,
    }
  );
};

// =======================================
// ONLY ORGANIZATION DELETE
// =======================================
const deleteBill = async (
  billId,
  organizationId
) => {
  return await Bill.findOneAndDelete({
    _id: billId,
    organizationId,
  });
};

// =======================================
// USER MARK BILL AS PAID
// =======================================
const payBill = async (
  billId,
  userId
) => {
  return await Bill.findOneAndUpdate(
    {
      _id: billId,
      userId,
    },
    {
      status: "paid",
      paidAt: new Date(),
    },
    {
      new: true,
    }
  );
};

module.exports = {
  createBill,
  getUserBills,
  getOrganizationBills,
  getBillById,
  updateBill,
  deleteBill,
  payBill,
};