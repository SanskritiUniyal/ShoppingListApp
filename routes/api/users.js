const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const {
  validateRegistration,
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
  verifyToken
} = require('../../middleware/auth');

const router = express.Router();

// 📋 Register - PUBLIC
router.post('/', validateRegistration, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already enrolled. Please sign in.' });

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = generateAccessToken(savedUser);
    const refreshToken = generateRefreshToken(savedUser);

    res.json({
      msg: 'Registration successful',
      accessToken: token,
      refreshToken,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).send('Server error');
  }
});

// 🔑 Login - PUBLIC
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Incorrect password.' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      msg: 'Login successful',
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Login error.' });
  }
});

// 🔄 Refresh Access Token
router.post('/refresh', refreshAccessToken);

// 👤 Get Current User Info
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching user.' });
  }
});

// 🗑 Delete Current User
router.delete('/me', verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: 'User account deleted.' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting user.' });
  }
});

// 🌟 /api/users/profile – Used for Redux hydration
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching profile.' });
  }
});

module.exports = router;
