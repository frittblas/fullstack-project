import express from 'express';
import users from '../models/userModel.js';

const router = express.Router();

//See all the users in db.
router.get('/users', async (req, res) => {
  try {
    const getStudents = await users.find({});
    res.send(getStudents);
  } catch (err) {
    res.status(500).send(err);
  }
});

//See specific user in db. 
router.get('/users/:name', async (req, res) => {
    const name = req.params.name;
    try {
      const user = await users.findOne({ username: name });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });

//Delete specific user from db. 
  router.delete('/users/:name', async (req, res) => {
    const name = req.params.name;
    try {
      const user = await users.findOneAndDelete({ username: name });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
export default router;
