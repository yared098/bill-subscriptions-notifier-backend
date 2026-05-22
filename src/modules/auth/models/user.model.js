const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
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
      select: false,
    },

    profileImage: {
      type: String,
      default: null,
    },

    faydaId: {
      type: String,
      unique: true,
      sparse: true,
    },

    isFaydaVerified: {
      type: Boolean,
      default: false,
    },

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
        default: true,
      },
    },

    fcmTokens: [
      {
        type: String,
      },
    ],

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
  "User",
  userSchema
);