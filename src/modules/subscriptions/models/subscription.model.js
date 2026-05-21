const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    // ====================================
    // CONNECTED USER (OPTIONAL)
    // Added automatically after phone match
    // ====================================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ====================================
    // COMPANY / ORGANIZATION
    // Example:
    // Netflix, Ethio Telecom, Canal+
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
    // CUSTOMER INFO
    // Phone number is the relationship key
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

    customerEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    // ====================================
    // SUBSCRIPTION INFO
    // ====================================
    serviceName: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    billingCycle: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "monthly",
    },

    renewalDate: {
      type: Date,
      required: true,
    },

    autoRenew: {
      type: Boolean,
      default: true,
    },

    category: {
      type: String,
      default: "Other",
    },

    provider: {
      type: String,
    },

    notes: {
      type: String,
    },

    // ====================================
    // STATUS MANAGEMENT
    // ====================================
    status: {
      type: String,
      enum: [
        "active",
        "cancelled",
        "paused",
        "expired",
        "pending",
      ],
      default: "active",
    },

    // ====================================
    // USER UNSUBSCRIBE FEATURE
    // ====================================
    unsubscribedByUser: {
      type: Boolean,
      default: false,
    },

    unsubscribeReason: {
      type: String,
    },

    unsubscribedAt: {
      type: Date,
    },

    // ====================================
    // REMINDER / NOTIFICATION SYSTEM
    // ====================================
    notificationEnabled: {
      type: Boolean,
      default: true,
    },

    renewalReminderSent: {
      type: Boolean,
      default: false,
    },

    lastReminderDate: {
      type: Date,
    },

    // ====================================
    // PAYMENT TRACKING
    // ====================================
    lastPaymentDate: {
      type: Date,
    },

    nextBillingAmount: {
      type: Number,
    },

    currency: {
      type: String,
      default: "ETB",
    },

    // ====================================
    // IMPORT SYSTEM
    // Organization uploaded from Excel
    // ====================================
    importedFromExcel: {
      type: Boolean,
      default: false,
    },

    excelBatchId: {
      type: String,
    },

    // ====================================
    // DEVICE / APP VISIBILITY
    // ====================================
    visibleToUser: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Subscription",
  subscriptionSchema
);