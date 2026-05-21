// routes/bill.routes.js

const express = require("express");

const router = express.Router();

const billController = require("../controllers/bill.controller");

const {
  protect,
} = require("../../auth/middlewares/auth.middleware");

// =======================================
// USER ROUTES
// =======================================

// user sees own bills
router.get(
  "/my-bills",
  protect,
  billController.getMyBills
);

// user marks as paid
router.patch(
  "/:id/pay",
  protect,
  billController.payBill
);

// =======================================
// ORGANIZATION ROUTES
// =======================================

// organization create bill
router.post(
  "/",
  protect,
  billController.createBill
);

// organization get own created bills
router.get(
  "/organization",
  protect,
  billController.getOrganizationBills
);

// single bill
router.get(
  "/:id",
  protect,
  billController.getBill
);

// update
router.put(
  "/:id",
  protect,
  billController.updateBill
);

// delete
router.delete(
  "/:id",
  protect,
  billController.deleteBill
);

module.exports = router;