import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './ultils/db.js';
import userRoutes from './routes/userRoutes.js';
import videoSharedRoutes from './routes/videoSharedRoutes.js';

const app = express();

dotenv.config();

app.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true,
}));

connectDB();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);
app.use('/api/videos-shared', videoSharedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
