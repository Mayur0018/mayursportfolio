import connectMongo from '../lib/mongodb';
import Notification from '../models/Notification';

export async function getNotificationsService(userId: string) {
  await connectMongo();
  return Notification.find({ receiver: userId }).sort({ createdAt: -1 }).populate('sender', 'name avatar');
}

export async function markNotificationReadService(id: string) {
  await connectMongo();
  const notification = await Notification.findById(id);
  if (!notification) throw new Error('Notification not found');
  notification.isRead = true;
  await notification.save();
  return notification;
}
