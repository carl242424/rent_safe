const express = require('express');
const { getRentals, getRentalById, createRental, updateRental, completeRental, cancelRental } = require('../controllers/rentalController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getRentals);
router.get('/:id', isAuthenticated, isAdmin, getRentalById);
router.post('/', isAuthenticated, isAdmin, createRental);
router.put('/:id', isAuthenticated, isAdmin, updateRental);
router.post('/:id/complete', isAuthenticated, isAdmin, completeRental);
router.post('/:id/cancel', isAuthenticated, isAdmin, cancelRental);

module.exports = router;
