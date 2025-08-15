// server/routes/auth.js
const express = require("express");
const router = express.Router();

const { 
  registerUser,       // Manual registration with verification
  registerGoogle,     // Google/Email auto registration
  verifyEmail,        // Email verification endpoint
  loginUser, 
  refreshToken,   
  logout           
} = require("../controllers/authController");

const authController = require("../controllers/authController");


const { registerValidation, loginValidation } = require("../validators/authValidator");
const validate = require("../middleware/validate");

// Manual registration with validation
router.post("/register", registerValidation, validate, registerUser);

// Google auto-registration (no password needed)
router.post("/register/google", registerGoogle);

// Email verification route
router.get("/verify-email/:token", authController.verifyEmail);

// Login
router.post("/login", loginValidation, validate, loginUser);

// Refresh token
router.post("/refresh", refreshToken);

// Logout
router.post("/logout", logout);

module.exports = router;
