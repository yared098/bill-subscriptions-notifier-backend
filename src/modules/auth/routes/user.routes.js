const express = require("express");

const router = express.Router();

const userController = require(
  "../controllers/user.controller"
);

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

// AUTH
router.post(
  "/register",
  userController.register
);

router.post(
  "/login",
  userController.login
);

// PROFILE
router.get(
  "/me",
  authMiddleware.protect,
  userController.getMe
);

router.put(
  "/update-profile",
  authMiddleware.protect,
  userController.updateProfile
);

router.put(
  "/change-password",
  authMiddleware.protect,
  userController.changePassword
);

router.delete(
  "/delete-account",
  authMiddleware.protect,
  userController.deleteAccount
);

module.exports = router;