const mongoose = require('mongoose');

const activitySchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    type: { type: String, required: true },
    description: { type: String, required: true },
    link: String,
  },
  { timestamps: true }
);

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
