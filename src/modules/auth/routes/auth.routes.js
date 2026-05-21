const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// AUTH
router.post("/register", authController.register);
router.post("/login", authController.login);

// 🔥 GET PROFILE (FIXED MIDDLEWARE NAME)
router.get("/me", authMiddleware.protect, authController.getMe);

module.exports = router;