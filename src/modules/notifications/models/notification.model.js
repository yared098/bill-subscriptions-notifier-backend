const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "bill",
        "subscription",
        "system",
        "organization",
      ],
      default: "system",
    },

    // =========================
    // DELIVERY CHANNELS
    // =========================
    channels: {
      email: {
        type: Boolean,
        default: false,
      },

      push: {
        type: Boolean,
        default: false,
      },

      socket: {
        type: Boolean,
        default: false,
      },

      sms: {
        type: Boolean,
        default: false,
      },
    },

    // =========================
    // DELIVERY STATUS
    // =========================
    status: {
      type: String,
      enum: [
        "sent",
        "failed",
        "pending",
      ],
      default: "pending",
    },

    read: {
      type: Boolean,
      default: false,
    },

    // =========================
    // TRACKING
    // =========================
    fcmMessageId: {
      type: String,
      default: null,
    },

    smsMessageId: {
      type: String,
      default: null,
    },

    failureReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);