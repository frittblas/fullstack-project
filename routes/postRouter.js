import express from 'express';
import post from '../models/postModel.js';
import {decryptJWT} from '../routes/authentication/webtoken.js'

const router = express.Router();

//Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await post.find({program: "All"}).sort({date: 'desc'});
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get all posts for program in jwt
router.get('/program', async (req, res) => {
  try {
    const decryptedToken = decryptJWT(req.cookies.access_token);
    const program = decryptedToken.program;
    const posts = await post.find({program: program}).sort({date: 'desc'});
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
})



// Get one post, remove the image from response.
router.get('/:id', async (req, res) => {
  try {
    const onePost = await post.findById(req.params.id);
    const postObject = await JSON.parse(JSON.stringify(onePost));
    delete postObject.image;
    res.send(postObject);
  } catch (err) {
    res.status(500).send(err);
  }
})
/*
//Create new post
router.post('/', async (req, res) => {
  try {
    const { author, title, message, image, program } = req.body;
    const imageString = JSON.stringify(image)
    const newPost = await post.create({ author: author, title: title, message: message, image: imageString, date: new Date(), program: program });
    res.status(201).send(newPost);
  } catch (err) {
    res.status(500).send(err);
  }
});*/


//New functionality for creating posts based on program.
router.post('/', async (req, res) => {
  const allPosts = req.query.all;
  let newPost = null;

  try {
    const decryptedToken = decryptJWT(req.cookies.access_token);
    const program = decryptedToken.program;
    const username = decryptedToken.username;

    const {  title, message, image } = req.body;
    const imageString = JSON.stringify(image)

    if (parseInt(allPosts) === 1) {
      newPost = await post.create({ author: username, title: title, message: message, image: imageString, date: new Date(), program: "All" });
    } else if (parseInt(allPosts) === 0) {
      newPost = await post.create({ author: username, title: title, message: message, image: imageString, date: new Date(), program: program });
    } else {
      res.status(400).send("Bad request")
    }
    res.status(201).send(newPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get an image from post
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

//Insert a reply into a post
router.put('/:id/reply', async (req, res) => {
  try {
    const postId = req.params.id;
    const { author, message } = req.body;
    const updatedPost = await post.findByIdAndUpdate(postId, { $push: { replies: { author: author, reply: message, date: new Date() } } },{ new: true } 
    )
    const updatedPostObject = await JSON.parse(JSON.stringify(updatedPost));
    delete updatedPostObject.image;
    res.send(updatedPostObject);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
