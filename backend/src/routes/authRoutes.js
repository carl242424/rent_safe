const express = require('express');
const { login, logout, getMe, seedAdmin } = require('../controllers/authController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', isAuthenticated, isAdmin, getMe);
router.post('/seed-admin', seedAdmin);

module.exports = router;
