const express = require("express");
const router = express.Router();

const { 
  registerUser, 
  loginUser, 
  refreshToken,   
  logout           
} = require("../controllers/authController");

const { registerValidation, loginValidation } = require("../validators/authValidator");
const validate = require("../middleware/validate");

// Apply validation middleware before controller
router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);

// New routes for refresh token and logout (no validation needed here)
router.post("/refresh", refreshToken);
router.post("/logout", logout);

module.exports = router;
