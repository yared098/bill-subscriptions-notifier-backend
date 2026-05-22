const express = require("express");

const router = express.Router();

const organizationController = require(
  "../controllers/organization.controller"
);

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

// AUTH
router.post(
  "/register",
  organizationController.register
);

router.post(
  "/login",
  organizationController.login
);

// PROFILE
router.get(
  "/me",
  authMiddleware.protect,
  organizationController.getMe
);

router.put(
  "/update-profile",
  authMiddleware.protect,
  organizationController.updateProfile
);

router.put(
  "/change-password",
  authMiddleware.protect,
  organizationController.changePassword
);

router.delete(
  "/delete-account",
  authMiddleware.protect,
  organizationController.deleteAccount
);

module.exports = router;