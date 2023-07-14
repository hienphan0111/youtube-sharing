import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './ultils/db.js';

const app = express();

dotenv.config();

app.use(cors({
  origin: 'http://localhost:5137'
}));

connectDB();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
