const analyticsService = require("../services/analytics.service");

const getAnalytics = async (req, res) => {
  try {
    const data = await analyticsService.getAnalytics(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};