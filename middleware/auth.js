const jwt = require('jsonwebtoken');

const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields: name, email, password' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  next();
};

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: '3d' }
  );
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'Access denied. No token provided.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ msg: 'Access token expired. Please refresh.' });
    }
    res.status(403).json({ msg: 'Invalid or expired access token.' });
  }
};

const refreshAccessToken = (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ msg: 'Refresh token missing.' });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const newAccessToken = generateAccessToken({ _id: decoded.id });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ msg: 'Refresh token expired. Please reauthenticate.' });
    }
    res.status(403).json({ msg: 'Refresh token invalid or expired.' });
  }
};

module.exports = {
  validateRegistration,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  refreshAccessToken
};
