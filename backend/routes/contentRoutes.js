const express = require('express');
const { getAllContent, createContent, updateContent, deleteContent } = require('../controllers/contentController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getAllContent)
  .post(protect, admin, createContent);

router.route('/:id')
  .put(protect, admin, updateContent)
  .delete(protect, admin, deleteContent);

module.exports = router;
