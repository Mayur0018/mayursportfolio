import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['post', 'event', 'video'], required: true },
    title: { type: String, required: true },
    description: { type: String },
    mediaUrl: { type: String },
    date: { type: Date },
    location: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);
export default Content;
