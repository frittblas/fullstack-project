import express from 'express';
import user from '../models/userModel.js';
import login from './authentication/login.js';
import register from './authentication/register.js';

const router = express.Router();

//Get all users
router.get('/', async (req, res) => {
  try {
    const users = await user.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get one user by id, remove id from response:
router.get('/:id', async (req, res) => {
  try {
    const someUser = await user.findById(req.params.id);
    const userObject = await JSON.parse(JSON.stringify(someUser));
    delete userObject.profileImg;
    res.send(userObject);
  } catch (err) {
    res.status(500).send(err);
  }
})



router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const message = await login(username, password);
    res.send(message);
  } catch (err) {
    res.status(500).send(err.message);
  }

})

router.post('/register', async (req, res) => {

  try {
    const { firstname, lastname, username, email, password, programTitle, profileImg } = req.body;

    const profileImgString = await JSON.stringify(profileImg);

    const user = {
      firstname,
      lastname,
      username,
      email,
      password,
      programTitle,
      profileImg: profileImgString,
    };

    const message = await register(user);
    res.send(message);
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:id/image', async (req, res) => {
  try {
    const someUser = await user.findById(req.params.id);
    if (!someUser) return res.status(404).json("404: Page not found!");

    const imageObj = await JSON.parse(someUser.profileImg);
    const image = Buffer.from(imageObj.contents, 'base64');

    res.set('Content-Type', imageObj.type);
    res.send(image);
    
  } catch (err) {
    res.status(500).send(err.message)
  }
})

export default router;