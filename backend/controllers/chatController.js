const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Get all conversations for a user
// @route   GET /api/chat/conversations
// @access  Private
const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Find unique users that the current user has exchanged messages with
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    }).sort({ createdAt: -1 });

    const userIds = new Set();
    const conversations = [];

    for (const msg of messages) {
      const otherUserId = msg.sender.toString() === userId.toString() ? msg.receiver.toString() : msg.sender.toString();
      
      if (!userIds.has(otherUserId)) {
        userIds.add(otherUserId);
        const otherUser = await User.findById(otherUserId).select('name username avatar');
        conversations.push({
          user: otherUser,
          lastMessage: msg,
        });
      }
    }

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get messages with a specific user
// @route   GET /api/chat/:id
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.id },
        { sender: req.params.id, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 }).populate('sender', 'name avatar').populate('receiver', 'name avatar');
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send a message
// @route   POST /api/chat
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });

    const populatedMsg = await Message.findById(message._id)
      .populate('sender', 'name avatar')
      .populate('receiver', 'name avatar');

    // Emit socket event if io is available
    const io = req.app.get('io');
    if (io) {
      io.to(receiverId).emit('new_message', populatedMsg);
    }

    res.status(201).json(populatedMsg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getConversations, getMessages, sendMessage };
