// server/routes/user.js
const express = require("express");
const router = express.Router();

// Middleware
const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

// Controllers
const { getProfile, updateProfile, deleteProfile } = require("../controllers/userController");

// Validators
const { updateProfileValidation } = require("../validators/userValidator");

// Routes
router.get("/me", authMiddleware, getProfile);
router.put("/me", authMiddleware, updateProfileValidation, validate, updateProfile);
router.delete("/me", authMiddleware, deleteProfile);

module.exports = router;
