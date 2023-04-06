import express from 'express';
import user from '../models/userModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await user.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;