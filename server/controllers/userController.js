const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getProfile = async (req, res, next) => {  // added next
  try {
    console.log('User ID from req.user:', req.user.id);

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      console.log('❌ User not found in DB for ID:', req.user.id);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('✅ User found:', user.email);
    res.json(user);

  } catch (err) {
    console.error('Error fetching profile:', err);
    next(err);  // changed here
  }
};

const updateProfile = async (req, res, next) => {  // added next
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();
    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
        __v: updatedUser.__v
      }
    });
  } catch (error) {
    next(error);  // changed here
  }
};

const deleteProfile = async (req, res, next) => {  // added next
  try {
    const userId = req.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User account deleted successfully" });
  } catch (error) {
    next(error);  // changed here
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile
};
