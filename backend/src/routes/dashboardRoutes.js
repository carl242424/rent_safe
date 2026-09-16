const express = require('express');
const { getDashboardStats, getRecentRentals } = require('../controllers/dashboardController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', isAuthenticated, isAdmin, getDashboardStats);
router.get('/recent-rentals', isAuthenticated, isAdmin, getRecentRentals);

module.exports = router;
