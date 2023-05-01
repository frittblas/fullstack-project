import express from 'express';
import about from '../models/aboutModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const aboutData = await about.find({});
    res.send(aboutData);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;