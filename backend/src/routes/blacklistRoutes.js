const express = require('express');
const { getBlacklist, checkBlacklist, createBlacklist, updateBlacklist, deleteBlacklist } = require('../controllers/blacklistController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getBlacklist);
router.get('/check', isAuthenticated, isAdmin, checkBlacklist);
router.post('/', isAuthenticated, isAdmin, createBlacklist);
router.put('/:id', isAuthenticated, isAdmin, updateBlacklist);
router.delete('/:id', isAuthenticated, isAdmin, deleteBlacklist);

module.exports = router;
