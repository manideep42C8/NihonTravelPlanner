// server/routes/auth.js
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { 
  registerUser,       // Manual registration with verification
  registerGoogle,     // Google/Email auto registration
  verifyEmail,        // Email verification endpoint
  loginUser, 
  refreshToken,   
  logout,
  requestPasswordReset,   // Forgot password → send reset email
  resetPassword,          // Reset password via token
  changePasswordProfile   // Change password via profile (old password)
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const { registerValidation, loginValidation } = require("../validators/authValidator");
const validate = require("../middleware/validate");

// Manual registration with validation
router.post("/register", registerValidation, validate, registerUser);

// Google auto-registration (no password needed)
router.post("/register/google", registerGoogle);

// Email verification route
router.get("/verify-email/:token", verifyEmail);

// Login
router.post("/login", loginValidation, validate, loginUser);

// Password reset request (forgot password)
router.post("/password-reset/request", requestPasswordReset);

// Reset password via token
router.post("/password-reset/confirm/:token", resetPassword);

// Change password via profile (old password required)
router.post("/password-change", authMiddleware, changePasswordProfile);

// Refresh token
router.post("/refresh", refreshToken);

// Logout
router.post("/logout", logout);

module.exports = router;
