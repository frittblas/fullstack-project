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


router.post('/', async (req, res) => {
  try {
    const { author, message, image, program } = req.body;
    const newPost = await post.create({ author: author, message: message, image: image, date: new Date(), program: program });
    res.send(newPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/:id/reply', async (req, res) => {
  try {
    const postId = req.params.id;
    const { author, message } = req.body;
    const updatedPost = await post.findByIdAndUpdate(postId, { $push: { replies: { author: author, reply: message, date: new Date() } } },{ new: true } 
    )
    res.send(updatedPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
