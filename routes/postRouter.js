import express from 'express';
import post from '../models/postModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await post.find({});
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
