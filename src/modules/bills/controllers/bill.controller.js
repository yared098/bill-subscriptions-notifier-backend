// controllers/bill.controller.js

const billService = require("../services/bill.service");

// =======================================
// ORGANIZATION CREATE BILL
// =======================================
const createBill = async (req, res) => {
  try {
    const bill = await billService.createBill(
      req.body,
      req.user.id
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

// =======================================
// USER GET HIS BILLS
// =======================================
const getMyBills = async (req, res) => {
  try {
    const bills =
      await billService.getUserBills(
        req.user.id,
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
const getOrganizationBills = async (
  req,
  res
) => {
  try {
    const bills =
      await billService.getOrganizationBills(
        req.user.id
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