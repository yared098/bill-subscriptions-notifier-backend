const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFO
    // =========================

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    password: {
      type: String,
    },

    profileImage: {
      type: String,
      default: null,
    },

    // =========================
    // FAYDA SUPPORT
    // =========================

    faydaId: {
      type: String,
      unique: true,
      sparse: true,
    },

    isFaydaVerified: {
      type: Boolean,
      default: false,
    },

    // =========================
    // ROLE SYSTEM
    // =========================

    role: {
      type: String,
      enum: [
        "user",
        "admin",
        "organization",
      ],
      default: "user",
    },

    // =========================
    // ORGANIZATION SUPPORT
    // =========================

    organizationName: {
      type: String,
      default: null,
    },

    organizationType: {
      type: String,
      default: null,
    },

    organizationAddress: {
      type: String,
      default: null,
    },

    organizationLogo: {
      type: String,
      default: null,
    },

    organizationVerified: {
      type: Boolean,
      default: false,
    },

    // =========================
    // ACCOUNT STATUS
    // =========================

    isActive: {
      type: Boolean,
      default: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    // =========================
    // 🔔 FIREBASE NOTIFICATIONS
    // =========================

    // Single device support
    fcmToken: {
      type: String,
      default: null,
    },

    // Multi-device support
    fcmTokens: [
      {
        type: String,
      },
    ],

    // Notification preferences
    notificationSettings: {
      email: {
        type: Boolean,
        default: true,
      },

      push: {
        type: Boolean,
        default: true,
      },

      sms: {
        type: Boolean,
        default: false,
      },
    },

    // =========================
    // DEVICE & LOGIN TRACKING
    // =========================

    lastLoginAt: {
      type: Date,
      default: null,
    },

    lastLoginDevice: {
      type: String,
      default: null,
    },

    // =========================
    // SECURITY
    // =========================

    passwordChangedAt: {
      type: Date,
      default: null,
    },

    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    accountLockedUntil: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);