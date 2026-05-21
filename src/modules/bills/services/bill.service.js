// services/bill.service.js

const Bill = require("../models/bill.model");

// =======================================
// ORGANIZATION CREATE BILL
// =======================================
const createBill = async (data, organizationId) => {
  const bill = await Bill.create({
    ...data,
    organizationId,
  });

  return bill;
};

// =======================================
// USER GET HIS BILLS
// =======================================
const getUserBills = async (userId, type) => {
  let filter = {
    userId,
    visibleToUser: { $ne: false },
  };

  const now = new Date();

  if (type === "paid") {
    filter.status = "paid";
  }

  if (type === "unpaid") {
    filter.status = "unpaid";
  }

  if (type === "upcoming") {
    filter.status = "unpaid";
    filter.dueDate = { $gte: now };
  }

  return await Bill.find(filter).sort({
    dueDate: 1,
  });
};

// =======================================
// ORGANIZATION GET CREATED BILLS
// =======================================
const getOrganizationBills = async (
  organizationId
) => {
  return await Bill.find({
    organizationId,
  }).sort({
    createdAt: -1,
  });
};

// =======================================
// SINGLE BILL
// USER CAN VIEW HIS OWN
// OR COMPANY CAN VIEW OWN CREATED BILL
// =======================================
const getBillById = async (
  billId,
  user
) => {
  return await Bill.findOne({
    _id: billId,
    $or: [
      { userId: user.id },
      { organizationId: user.id },
    ],
  });
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