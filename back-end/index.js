// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import connectDB from './ultils/db.js';
// import userRoutes from './routes/userRoutes.js';
// import videoSharedRoutes from './routes/videoSharedRoutes.js';
// import http from 'http';
// import { Server } from 'socket.io';

// const app = express();

// dotenv.config();

// app.use(cors({ origin: true }));
// app.use(express.json());

// // app.use(cors({
// //   origin: 'http://127.0.0.1:5173',
// //   credentials: true,
// // }));

// // app.use(bodyParser.json());

// // const server = http.createServer(app);

// // const io = new Server(server, {
// //   cors: {
// //     origin: '*',
// //     methods: ['GET', 'POST'],
// //   }
// // });

// // io.on('connection', (socket) => {
// //   console.log(`User Connected: ${socket.id}`);

// //   socket.on('add_new_video_shared', (data) => {
// //     console.log(data);
// //     socket.broadcast.emit('new-_ideo_shared', data);
// //   })

// //   socket.on('handshake', (data) => {
// //     console.log(data);
// //   });
// // });

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   }
// });

// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on('send_message', (data) => {
//     console.log(data);
//     socket.broadcast.emit('receive_message', data);
//   })
// });

// connectDB();

// const PORT = process.env.PORT || 5000;

// app.use('/api/users', userRoutes);
// app.use('/api/videos-shared', videoSharedRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

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
