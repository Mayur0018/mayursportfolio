const mongoose = require('mongoose');

const contentSchema = mongoose.Schema(
  {
    type: { type: String, enum: ['post', 'event', 'video'], required: true },
    title: { type: String, required: true },
    description: { type: String },
    mediaUrl: { type: String }, // Video URL or Image URL
    date: { type: Date },
    location: { type: String }, // For events
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;
