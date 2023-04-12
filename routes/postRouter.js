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
    const imageString = JSON.stringify(image)
    const newPost = await post.create({ author: author, message: message, image: imageString, date: new Date(), program: program });
    res.status(201).send(newPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:id/image', async (req, res) => {
  try {
    const newPost = await post.findById(req.params.id);
    if (!newPost) {
      return res.status(404).json("404: Post not found!");
    }

    const imageObj = await JSON.parse(newPost.image);
    const image = Buffer.from(imageObj.contents, 'base64');

    res.set('Content-Type', imageObj.type);
    res.send(image);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
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
