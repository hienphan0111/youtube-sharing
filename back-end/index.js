import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './ultils/db.js';
import userRoutes from './routes/userRoutes.js';
import videoSharedRoutes from './routes/videoSharedRoutes.js';

const app = express();
dotenv.config();

app.use(cors({ origin: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('send_message', (data) => {
    console.log(data);
    socket.broadcast.emit('receive_message', data);
  })

  socket.on('new_video_shared', (data) => {
    console.log(data);
    socket.broadcast.emit('new_video_shared', data);
  });
})

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/videos-shared', videoSharedRoutes);

server.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
});

export { app, io };
