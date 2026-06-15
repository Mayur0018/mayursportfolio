const mongoose = require('mongoose');

const skillSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ['frontend', 'backend', 'tools', 'other'], default: 'frontend' },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
