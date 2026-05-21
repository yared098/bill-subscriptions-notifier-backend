const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    // ====================================
    // TARGET USER (OPTIONAL)
    // If user already registered
    // ====================================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ====================================
    // ORGANIZATION THAT CREATED BILL
    // Example:
    // Ethio Telecom, EEU, Water Company
    // ====================================
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    organizationName: {
      type: String,
      required: true,
    },

    // ====================================
    // CUSTOMER UNIQUE IDENTIFIER
    // THIS IS THE IMPORTANT PART
    // Phone number is used to connect
    // uploaded Excel bills with user account
    // ====================================
    customerPhone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    // ====================================
    // BILL INFORMATION
    // ====================================
    title: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["paid", "unpaid", "overdue"],
      default: "unpaid",
    },

    recurring: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
    },

    receiptImage: {
      type: String,
    },

    // ====================================
    // NOTIFICATION SYSTEM
    // ====================================
    notificationSent: {
      type: Boolean,
      default: false,
    },

    notificationDate: {
      type: Date,
    },

    // ====================================
    // EXCEL IMPORT TRACKING
    // ====================================
    importedFromExcel: {
      type: Boolean,
      default: false,
    },

    excelBatchId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bill", billSchema);