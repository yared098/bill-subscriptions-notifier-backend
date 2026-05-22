const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Organization = require("../models/organization.model");


const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let account = null;

    if (decoded.type === "user") {
      account = await User.findById(decoded.id).select("-password");
    }

    if (decoded.type === "organization") {
      account = await Organization.findById(decoded.id).select("-password");
    }

    if (!account) {
      return res.status(401).json({
        success: false,
        message: "Account not found",
      });
    }

    // ✅ FORCE CONSISTENT ID
    req.user = {
      ...account.toObject(),
      id: account._id.toString(),
    };

    req.tokenData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
// middlewares/role.middleware.js
const organizationOnly = (req, res, next) => {
  if (req.user.role !== "organization") {
    return res.status(403).json({
      success: false,
      message: "Only organization can send notifications",
    });
  }

  next();
};


module.exports = {
  protect,
  organizationOnly
};