const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}` });
});

module.exports = router;
