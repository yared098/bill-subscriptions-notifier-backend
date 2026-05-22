const organizationService = require(
  "../services/organization.service"
);

// REGISTER
const register = async (req, res) => {
  try {
    const organization =
      await organizationService.registerOrganization(
        req.body
      );

    res.status(201).json({
      success: true,
      data: organization,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const result =
      await organizationService.loginOrganization(
        req.body
      );

    res.status(200).json({
      success: true,
      token: result.token,
      organization:
        result.organization,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// GET PROFILE
const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.organization,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateProfile = async (
  req,
  res
) => {
  try {
    const updatedOrganization =
      await organizationService.updateOrganizationProfile(
        req.organization._id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: updatedOrganization,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// CHANGE PASSWORD
const changePassword = async (
  req,
  res
) => {
  try {
    await organizationService.changeOrganizationPassword(
      req.organization._id,
      req.body
    );

    res.status(200).json({
      success: true,
      message:
        "Password updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteAccount = async (
  req,
  res
) => {
  try {
    await organizationService.deleteOrganization(
      req.organization._id
    );

    res.status(200).json({
      success: true,
      message:
        "Organization deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  deleteAccount,
};