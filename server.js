import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import programRouter from './routes/programRouter.js';
import adminRouter from './routes/adminRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/programs', programRouter);
app.use('/admin', adminRouter);

app.all('*');


mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to mongodb");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => console.log(err));