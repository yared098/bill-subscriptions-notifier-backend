const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

// =========================
// REGISTER USER
// =========================

const registerUser = async (data) => {
  const existingUser =
    await User.findOne({
      $or: [
        { email: data.email },
        { phone: data.phone },
        { username: data.username },
      ],
    });

  if (existingUser) {
    throw new Error(
      "User already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(data.password, 10);

  const user = await User.create({
    fullName: data.fullName,
    username: data.username,
    email: data.email,
    phone: data.phone,
    password: hashedPassword,
    faydaId: data.faydaId,
  });

  return user;
};

// =========================
// LOGIN USER
// =========================

const loginUser = async (data) => {
  const user = await User.findOne({
    email: data.email,
  }).select("+password");

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  // UPDATE LOGIN TRACKING
  user.lastLoginAt = new Date();

  await user.save();

  const token = jwt.sign(
    {
      id: user._id,
      type: "user",
    },
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    user,
  };
};

// =========================
// GET PROFILE
// =========================

const getUserProfile = async (
  userId
) => {
  const user = await User.findById(
    userId
  );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  return user;
};

// =========================
// UPDATE PROFILE
// =========================

const updateUserProfile =
  async (userId, data) => {
    const updatedUser =
      await User.findByIdAndUpdate(
        userId,
        {
          fullName: data.fullName,
          username: data.username,
          phone: data.phone,
          profileImage:
            data.profileImage,

          notificationSettings:
            data.notificationSettings,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    return updatedUser;
  };

// =========================
// CHANGE PASSWORD
// =========================

const changeUserPassword =
  async (userId, data) => {
    const {
      currentPassword,
      newPassword,
    } = data;

    const user =
      await User.findById(userId).select(
        "+password"
      );

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      throw new Error(
        "Current password incorrect"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    user.passwordChangedAt =
      new Date();

    await user.save();
  };

// =========================
// DELETE USER
// =========================

const deleteUser = async (
  userId
) => {
  const user = await User.findById(
    userId
  );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  await User.findByIdAndDelete(
    userId
  );
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  deleteUser,
};