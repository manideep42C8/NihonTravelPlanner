// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get profile of logged-in user
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
        code: "USER_NOT_FOUND"
      });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Update profile of logged-in user
const updateProfile = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (err) {
    next(err);
  }
};

// Delete profile of logged-in user
const deleteProfile = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
        code: "USER_NOT_FOUND"
      });
    }
    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile
};
