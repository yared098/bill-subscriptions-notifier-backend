const service = require("../services/subscription.service");

// ===============================
// ORGANIZATION CREATE
// ===============================
const createSubscription = async (req, res) => {
  try {
    const data = await service.createSubscription(
      req.body,
      req.user
    );

    res.status(201).json({
      success: true,
      data,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// ===============================
// USER VIEW ONLY THEIR SUBSCRIPTIONS
// ===============================
// ===============================
// USER VIEW ONLY THEIR SUBSCRIPTIONS
// ===============================
const getMySubscriptions = async (req, res) => {
  try {
    const userId = req.user.id;
    const phone = req.user.phone;

    const data = await service.getUserSubscriptions({
      userId,
      phone,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// ===============================
// USER UNSUBSCRIBE
// ===============================
const unsubscribe = async (req, res) => {
  try {
    const data = await service.unsubscribe(
      req.params.id,
      req.user.phone,
      req.body.reason
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// ===============================
// ORGANIZATION GET ALL
// ===============================
const getOrganizationSubscriptions = async (req, res) => {
  try {
    const data = await service.getOrganizationSubscriptions(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  createSubscription,
  getMySubscriptions,
  unsubscribe,
  getOrganizationSubscriptions,
};