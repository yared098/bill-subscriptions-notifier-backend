const express = require("express");
const router = express.Router();

const billController = require("../controllers/bill.controller");
const { protect } = require("../../auth/middlewares/auth.middleware");


// =====================================================
// 🧑 USER ROUTES (MOBILE)
// =====================================================

// get my bills (phone/userId match)
router.get("/me", protect, billController.getMyBills);

// mark bill as paid
router.patch("/:id/pay", protect, billController.payBill);


// =====================================================
// 🏢 ORGANIZATION ROUTES (DASHBOARD)
// =====================================================

// create bill (auto binds organizationId)
router.post("/", protect, billController.createBill);

// get ONLY organization bills (STRICT FILTER)
router.get("/organization", protect, billController.getOrganizationBills);


// =====================================================
// 🔍 SHARED BILL ROUTES
// =====================================================

// get single bill (permission checked in service)
router.get("/:id", protect, billController.getBill);

// update bill (ONLY organization owner)
router.put("/:id", protect, billController.updateBill);

// delete bill (ONLY organization owner)
router.delete("/:id", protect, billController.deleteBill);


module.exports = router;