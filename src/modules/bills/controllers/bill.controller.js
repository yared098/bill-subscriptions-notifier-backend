// controllers/bill.controller.js

const billService = require("../services/bill.service");


const createBill = async (req, res) => {
  try {
    const bill = await billService.createBill(
      req.body,
      req.user // 👈 pass full user object, not only id
    );

    res.status(201).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyBills = async (req, res) => {
  try {

    console.log("USER PHONE:", req.user.phone);
    console.log("USER ID:", req.user.id);

    const bills = await billService.getUserBills(
      req.user.id,
      req.user.phone,
      req.query.type
    );

    res.status(200).json({
      success: true,
      data: bills,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =======================================
// ORGANIZATION GET BILLS
// =======================================
const getOrganizationBills = async (req, res) => {
  try {
    const orgId = req.user._id; // ✅ FIX HERE

    console.log("🏢 ORG ID:", orgId);

    const bills = await billService.getOrganizationBills(orgId);

    console.log("📦 FOUND BILLS:", bills.length);

    res.status(200).json({
      success: true,
      data: bills,
    });
  } catch (error) {
    console.error("ORG BILL ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// GET SINGLE BILL
// =======================================
const getBill = async (req, res) => {
  try {
    const bill =
      await billService.getBillById(
        req.params.id,
        req.user
      );

    res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// ORGANIZATION UPDATE
// =======================================
const updateBill = async (req, res) => {
  try {
    const bill =
      await billService.updateBill(
        req.params.id,
        req.user.id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// ORGANIZATION DELETE
// =======================================
const deleteBill = async (req, res) => {
  try {
    await billService.deleteBill(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Bill deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// USER PAY BILL
// =======================================
const payBill = async (req, res) => {
  try {
    const bill = await billService.payBill(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBill,
  getMyBills,
  getOrganizationBills,
  getBill,
  updateBill,
  deleteBill,
  payBill,
};