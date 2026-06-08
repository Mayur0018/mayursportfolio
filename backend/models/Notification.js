const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
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

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
