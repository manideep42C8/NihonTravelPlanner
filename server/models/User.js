// server/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Can be null for Google registration
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String }, // For email verification
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
