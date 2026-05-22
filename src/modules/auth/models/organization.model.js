const mongoose = require("mongoose");

const organizationSchema =
  new mongoose.Schema(
    {
      // =========================
      // BASIC INFO
      // =========================

      organizationName: {
        type: String,
        required: true,
        trim: true,
      },

      organizationType: {
        type: String,
        enum: [
          "electric",
          "water",
          "telecom",
          "school",
          "internet",
          "government",
          "subscription",
          "other",
        ],
        required: true,
      },

      email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        unique: true,
        trim: true,
      },

      password: {
        type: String,
        select: false,
      },

      logo: {
        type: String,
        default: null,
      },

      coverImage: {
        type: String,
        default: null,
      },
      

      address: {
        type: String,
        default: null,
      },

      website: {
        type: String,
        default: null,
      },

      description: {
        type: String,
        default: null,
      },

      // =========================
      // VERIFICATION
      // =========================

      isVerified: {
        type: Boolean,
        default: false,
      },

      // =========================
      // BILLING SUPPORT
      // =========================

      supportedServices: [
        {
          type: String,
        },
      ],

      // =========================
      // PAYMENT SUPPORT
      // =========================

      paymentMethods: [
        {
          methodName: {
            type: String,
            enum: [
              "telebirr",
              "cbe",
              "chapa",
              "bank_transfer",
              "visa",
              "mastercard",
              "cash",
              "paypal",
              "other",
            ],
            required: true,
          },

          accountName: {
            type: String,
            default: null,
          },

          accountNumber: {
            type: String,
            default: null,
          },

          shortCode: {
            type: String,
            default: null,
          },

          qrCodeImage: {
            type: String,
            default: null,
          },

          paymentLink: {
            type: String,
            default: null,
          },

          isActive: {
            type: Boolean,
            default: true,
          },
        },
      ],

      // =========================
      // FIREBASE
      // =========================

      fcmTokens: [
        {
          type: String,
        },
      ],

      // =========================
      // STATUS
      // =========================

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Organization",
  organizationSchema
);