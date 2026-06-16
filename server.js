const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./backend/config/db');
const authRoutes = require('./backend/routes/authRoutes');
const userRoutes = require('./backend/routes/userRoutes');
const postRoutes = require('./backend/routes/postRoutes');
const projectRoutes = require('./backend/routes/projectRoutes');
const chatRoutes = require('./backend/routes/chatRoutes');
const notificationRoutes = require('./backend/routes/notificationRoutes');
const uploadRoutes = require('./backend/routes/uploadRoutes');
const searchRoutes = require('./backend/routes/searchRoutes');
const adminRoutes = require('./backend/routes/adminRoutes');
const configRoutes = require('./backend/routes/configRoutes');
const experienceRoutes = require('./backend/routes/experienceRoutes');
const skillRoutes = require('./backend/routes/skillRoutes');
const contentRoutes = require('./backend/routes/contentRoutes');

dotenv.config();
connectDB();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  app.use(cors());
  app.use(express.json());

  // Socket.io connection
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // Make io accessible to our routes
  app.set('io', io);

  // API Routes
  app.use('/api/config', configRoutes);
  app.use('/api/experience', experienceRoutes);
  app.use('/api/skills', skillRoutes);
  app.use('/api/content', contentRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/search', searchRoutes);
  app.use('/api/admin', adminRoutes);

  // Next.js Catch-all
  app.use((req, res) => {
    return handle(req, res);
  });

  // Error Middleware (only for API routes)
  app.use('/api', (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  });

  app.use('/api', (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
