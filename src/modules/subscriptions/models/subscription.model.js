const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    // =========================
    // ORGANIZATION OWNER
    // =========================
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    organizationName: {
      type: String,
      required: true,
    },

    // =========================
    // USER RELATION (PHONE BASED)
    // =========================
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

    // OPTIONAL LINK (only if user exists in system)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    // =========================
    // SUBSCRIPTION INFO
    // =========================
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
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "cancelled", "paused", "expired"],
      default: "active",
    },

    // =========================
    // USER CONTROL
    // =========================
    unsubscribedByUser: {
      type: Boolean,
      default: false,
    },

    unsubscribeReason: String,

    unsubscribedAt: Date,

    // =========================
    // VISIBILITY
    // =========================
    visibleToUser: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);