const express = require('express');
const { getConfig, updateConfig } = require('../controllers/configController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getConfig)
  .put(protect, admin, updateConfig);

module.exports = router;
