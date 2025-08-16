//controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
let refreshTokens = [];

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

async function getTransporter() {
  if (process.env.NODE_ENV === "development") {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: { user: testAccount.user, pass: testAccount.pass }
    });
  } else {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
  }
}

// ------------------ Manual Registration ------------------
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false
    });
    await newUser.save();

    const verifyLink = `http://localhost:5000/api/auth/verify-email/${verificationToken}`;
    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: process.env.NODE_ENV === "development" 
            ? `"NihonTravel Planner" <${transporter.options.auth.user}>` 
            : `"NihonTravel Planner" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify Your Email - NihonTravel Planner",
      html: `<p>Click below to verify your email:</p><a href="${verifyLink}">${verifyLink}</a>`
    });

    if (process.env.NODE_ENV === "development") {
      console.log("📧 Preview Email URL:", nodemailer.getTestMessageUrl(info));
    }

    res.status(201).json({ message: "Registration successful! Check email to verify." });
  } catch (err) {
    next(err);
  }
};

// ------------------ Email Verification ------------------
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).send("Invalid token");

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.send("<h1>Email verified successfully!</h1><p>You can now log in.</p>");
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid or expired token");
  }
};

// ------------------ Google Registration ------------------
exports.registerGoogle = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name: name || email.split("@")[0],
        email,
        password: null,
        isVerified: true
      });
      await user.save();
    }

    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET);
    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken, user });
  } catch (err) {
    next(err);
  }
};

// ------------------ Login ------------------
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.isVerified) return res.status(403).json({ message: "Verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET);
    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

// ------------------ Password Reset Request (Forgot Password) ------------------
exports.requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/password-reset/${token}`;
    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: process.env.NODE_ENV === "development" 
            ? `"NihonTravel Planner" <${transporter.options.auth.user}>` 
            : `"NihonTravel Planner" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Password Reset - NihonTravel Planner",
      html: `<p>Click below to reset your password (valid 1 hour):</p>
             <a href="${resetLink}">${resetLink}</a>`
    });

    if (process.env.NODE_ENV === "development") {
      console.log("📧 Preview Email URL:", nodemailer.getTestMessageUrl(info));
    }

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    next(err);
  }
};

// ------------------ Reset Password via Token ------------------
exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: "Password must be 8+ chars, 1 uppercase, 1 number, 1 special char" });
    }

    const user = await User.findOne({ 
      resetPasswordToken: token, 
      resetPasswordExpires: { $gt: Date.now() } 
    });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful!" });
  } catch (err) {
    next(err);
  }
};

// Change password (Profile) for logged-in users
exports.changePasswordProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // from authMiddleware
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: "New password must be 8+ chars, include 1 uppercase, 1 number, and 1 special character" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully!" });
  } catch (err) {
    next(err);
  }
};


// ------------------ Refresh Token ------------------
exports.refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "No token provided" });
  if (!refreshTokens.includes(token)) return res.status(403).json({ message: "Invalid refresh token" });

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    const accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ accessToken });
  } catch {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

// ------------------ Logout ------------------
exports.logout = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token);
  res.json({ message: "Logged out successfully" });
};
