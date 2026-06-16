import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    receiver: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    type: { type: String, enum: ['like', 'comment', 'follow', 'message', 'mention'], required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    link: String,
  },
  { timestamps: true }
);

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
export default Notification;
