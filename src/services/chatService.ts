import connectMongo from '../lib/mongodb';
import Message from '../models/Message';
import User from '../models/User';

export async function getConversationsService(userId: string) {
  await connectMongo();
  const messages = await Message.find({ $or: [{ sender: userId }, { receiver: userId }] }).sort({ createdAt: -1 });
  const userIds = new Set<string>();
  const conversations: any[] = [];

  for (const msg of messages) {
    const otherUserId = msg.sender.toString() === userId.toString() ? msg.receiver.toString() : msg.sender.toString();
    if (!userIds.has(otherUserId)) {
      userIds.add(otherUserId);
      const otherUser = await User.findById(otherUserId).select('name username avatar');
      conversations.push({ user: otherUser, lastMessage: msg });
    }
  }
  return conversations;
}

export async function getMessagesWithService(userId: string, otherId: string) {
  await connectMongo();
  return Message.find({
    $or: [
      { sender: userId, receiver: otherId },
      { sender: otherId, receiver: userId }
    ]
  }).sort({ createdAt: 1 }).populate('sender', 'name avatar').populate('receiver', 'name avatar');
}

export async function sendMessageService(senderId: string, receiverId: string, content: string) {
  await connectMongo();
  const msg = await Message.create({ sender: senderId, receiver: receiverId, content });
  const populated = await Message.findById(msg._id).populate('sender', 'name avatar').populate('receiver', 'name avatar');
  return populated;
}
