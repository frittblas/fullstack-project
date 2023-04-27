import express from 'express';
import users from '../models/userModel.js';
import { authenticateJWT } from './authentication/webtoken.js';

const router = express.Router();

//See all the users in db.
router.get('/users', authenticateJWT(['admin']), async (req, res) => {
  try {
    const getStudents = await users.find({});
    res.send(getStudents);
  } catch (err) {
    res.status(500).send(err);
  }
});

// restrict access to /admin TESTING PURPOSES
router.get('/admin', authenticateJWT(['admin']), async function (req, res) {
  try {
    console.log('You have admin access!!');
    res.status(200).send("You have admin access!");
  } catch (error) {
    console.log('Error in /admin route:', error.message);
  }
  // Check if authenticateJWT() returned false and print "no admin access"
  if (!req.user) {
    console.log('no admin access');
  }
});

//See specific user in db. 
router.get('/users/:name', authenticateJWT(['admin']), async (req, res) => {
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
router.delete('/users/:name', authenticateJWT(['admin']), async (req, res) => {
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
