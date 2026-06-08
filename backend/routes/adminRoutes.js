const express = require('express');
const { getAnalytics, getAllUsers } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/analytics', protect, admin, getAnalytics);
router.get('/users', protect, admin, getAllUsers);

module.exports = router;
