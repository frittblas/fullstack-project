import express from 'express';
import programs from '../models/programModel.js';
import { authenticateJWT } from './authentication/webtoken.js';
import { allowedPrograms } from './authentication/allowed.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allPrograms = await programs.find({});
    res.send(allPrograms);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;