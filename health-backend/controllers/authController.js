const jwt  = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();


// Token generator helper
const generateToken = (userId) => {
  return jwt.sign({ id: userId },process.env.jwtSecret, { expiresIn: '7d' });
};


// POST /api/auth/signup
const signup = async (req, res) => {
  console.log('Signup Request Body:', req.body);
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered!!!' });
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({
      message: 'Signup successful!',
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email }
    });

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// ✅ POST /api/auth/signin
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email Not Found in Database' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong Password!!!' });
    }

    res.json({
      message: 'Login successful!',
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { signup, signin };