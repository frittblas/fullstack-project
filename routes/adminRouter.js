import express from 'express';
import users from '../models/userModel.js';
import posts from '../models/postModel.js';
import { authenticateJWT } from './authentication/webtoken.js';
import { encryptPassword } from './authentication/encryption.js';
import { getUsersPerProgram, getPostsPerProgram, getNumberOfPosts, getNumberOfUsers } from './handlers/statistics.js';

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
router.delete('/users/:user_id', authenticateJWT(['admin']), async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const user = await users.findOneAndDelete({ _id: user_id });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});


//update
router.put('/users/:name', authenticateJWT(['admin']), async (req, res) => {
  const name = req.params.name;
  const updates = req.body;
  try {
    if (updates.password) {
      const enc = await encryptPassword(updates.password)
      updates.password = enc
    }
    const updatedUser = await users.findOneAndUpdate(
      { username: name },
      updates,
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.send(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Create new user in db. 
router.post('/users', authenticateJWT(['admin']), async (req, res) => {
  console.log(req);
  try {
    const newUser = new users(req.body);
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get('/statistics/users/', authenticateJWT(['admin']), async (req, res) => {
  try {
    const numberOfUsers = await getNumberOfUsers();
    res.send({users: numberOfUsers});
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/statistics/users/program', authenticateJWT(['admin']), async (req, res) => {
  try {
    const numberOfUsers = await getUsersPerProgram();
    res.send(numberOfUsers);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/statistics/posts/', authenticateJWT(['admin']), async (req, res) => {
  try {
    const numberOfPosts = await getNumberOfPosts();

    res.send({posts: numberOfPosts});
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/statistics/posts/program', authenticateJWT(['admin']), async (req, res) => {
  try {
    const numberOfUsers = await getPostsPerProgram();
    res.send(numberOfUsers);
  } catch (err) {
    res.status(500).send(err);
  }
});



export default router;
