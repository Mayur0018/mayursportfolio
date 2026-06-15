const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Experience = mongoose.model('Experience', experienceSchema);
module.exports = Experience;
