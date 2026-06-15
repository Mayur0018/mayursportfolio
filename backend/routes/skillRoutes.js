const express = require('express');
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getSkills)
  .post(protect, admin, createSkill);

router.route('/:id')
  .put(protect, admin, updateSkill)
  .delete(protect, admin, deleteSkill);

module.exports = router;
