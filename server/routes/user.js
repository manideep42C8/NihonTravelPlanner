const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/userController');
const User = require('../models/User');

// Import validation middleware
const { updateProfileValidation } = require('../validators/userValidator');
const validate = require('../middleware/validate');

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfileValidation, validate, updateProfile); // ✅ added validation here
router.delete('/me', authMiddleware, deleteProfile);

module.exports = router;
