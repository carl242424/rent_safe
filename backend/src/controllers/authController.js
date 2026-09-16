const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const isProduction = process.env.NODE_ENV?.toLowerCase() === 'production';

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET && isProduction) {
    throw new Error('JWT_SECRET is required in production');
  }
  return process.env.JWT_SECRET || 'dev-secret';
};

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, getJwtSecret(), {
    expiresIn: '7d',
  });

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });
  return res.json({ message: 'Logged out successfully' });
};

const getMe = async (req, res) => {
  return res.json({ user: req.user });
};

const seedAdmin = async (req, res) => {
  try {
    const { username = 'admin', email = 'admin@rentsafe.com', password = 'admin123' } = req.body || {};

    const existing = await User.findOne({ role: 'admin' });
    if (existing) {
      return res.status(200).json({ message: 'Admin already exists', user: { id: existing._id, username: existing.username, email: existing.email, role: existing.role } });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash, role: 'admin' });

    return res.status(201).json({ message: 'Admin created', user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(500).json({ message: 'Admin setup failed', error: error.message });
  }
};

module.exports = { login, logout, getMe, seedAdmin };
