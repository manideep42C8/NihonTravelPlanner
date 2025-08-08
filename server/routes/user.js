// routes/user.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/userController');
const User = require('../models/User');

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfile); // ✅ update profile
router.delete('/me', authMiddleware, deleteProfile); // ✅ delete profile

module.exports = router;
