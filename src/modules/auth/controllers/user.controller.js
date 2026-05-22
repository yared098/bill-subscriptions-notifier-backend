const userService = require(
  "../services/user.service"
);

// =========================
// REGISTER
// =========================

const register = async (
  req,
  res
) => {
  try {
    const user =
      await userService.registerUser(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// LOGIN
// =========================

const login = async (
  req,
  res
) => {
  try {
    const result =
      await userService.loginUser(
        req.body
      );

    res.status(200).json({
      success: true,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET PROFILE
// =========================

const getMe = async (
  req,
  res
) => {
  try {
    const user =
      await userService.getUserProfile(
        req.user._id
      );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// UPDATE PROFILE
// =========================

const updateProfile = async (
  req,
  res
) => {
  try {
    const updatedUser =
      await userService.updateUserProfile(
        req.user._id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// CHANGE PASSWORD
// =========================

const changePassword = async (
  req,
  res
) => {
  try {
    await userService.changeUserPassword(
      req.user._id,
      req.body
    );

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// DELETE ACCOUNT
// =========================

const deleteAccount = async (
  req,
  res
) => {
  try {
    await userService.deleteUser(
      req.user._id
    );

    res.status(200).json({
      success: true,
      message:
        "Account deleted successfully",
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