const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

let refreshTokens = []; // In-memory store for refresh tokens (replace with DB in prod)

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      REFRESH_SECRET
    );

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
};

// New refresh token handler
exports.refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(401).json({ message: "No token provided" });

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

// New logout handler
exports.logout = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token);
  res.json({ message: "Logged out successfully" });
};
