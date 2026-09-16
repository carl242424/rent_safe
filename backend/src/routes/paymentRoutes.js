const express = require('express');
const { getPaymentsByRental, createPayment } = require('../controllers/paymentController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/:rentalId', isAuthenticated, isAdmin, getPaymentsByRental);
router.post('/', isAuthenticated, isAdmin, createPayment);

module.exports = router;
