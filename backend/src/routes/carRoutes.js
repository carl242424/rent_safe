const express = require('express');
const { getCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/carController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getCars);
router.get('/:id', isAuthenticated, isAdmin, getCarById);
router.post('/', isAuthenticated, isAdmin, createCar);
router.put('/:id', isAuthenticated, isAdmin, updateCar);
router.delete('/:id', isAuthenticated, isAdmin, deleteCar);

module.exports = router;
