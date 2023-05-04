import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import programRouter from './routes/programRouter.js';
import adminRouter from './routes/adminRouter.js';
import aboutRouter from './routes/aboutRouter.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/programs', programRouter);
app.use('/api/admin', adminRouter);   // Hans changed this to /api/admin (was /admin before)
app.use('/api/about', aboutRouter);

//app.all('*');

// Serve the static files from the React app
app.use(express.static(join(__dirname, 'dist')));

// Handle any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist/index.html'));
});

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to mongodb");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => console.log(err));