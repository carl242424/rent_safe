const express = require('express');
const { getRenters, getRenterById, createRenter, updateRenter, getRenterHistory } = require('../controllers/renterController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getRenters);
router.get('/:id', isAuthenticated, isAdmin, getRenterById);
router.post('/', isAuthenticated, isAdmin, createRenter);
router.put('/:id', isAuthenticated, isAdmin, updateRenter);
router.get('/:id/history', isAuthenticated, isAdmin, getRenterHistory);

module.exports = router;
