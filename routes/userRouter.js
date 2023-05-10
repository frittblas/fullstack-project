import express from 'express';
import user from '../models/userModel.js';
import login from './authentication/login.js';
import logout from './authentication/logout.js';
import register from './authentication/register.js';
import { authenticateJWT } from './authentication/webtoken.js';
import { allowedPrograms } from './authentication/allowed.js';

const router = express.Router();

//Get all users
router.get('/', authenticateJWT(['admin']), async (req, res) => {
  try {
    const users = await user.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get one user by id, remove id from response:
router.get('/:id', authenticateJWT(allowedPrograms), async (req, res) => {
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
    const message = await login(res, username, password);
    res.send(message);
  } catch (err) {
    res.status(500).send(err.message);
  }

})

router.post('/logout', (req, res) => {

  try {
    logout(res);
    res.status(200).send({ message: "Logged out!" });
  } catch (err) {
    res.status(500).send(err.message);
  }

})

router.post('/register', async (req, res) => {

  try {
    const { firstname, lastname, username, email, password, programTitle, profileImg } = req.body;
    

    const user = {
      firstname,
      lastname,
      username,
      email,
      password,
      programTitle,
      profileImg: profileImg,
    };

    const message = await register(res, user);
    res.send(message);
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:id/image', authenticateJWT(allowedPrograms), async (req, res) => {
  try {
    const someUser = await user.findById(req.params.id);
    if (!someUser) return res.sendFile('public/noavatar.png', { root: './' });

    // const imageObj = await JSON.parse(someUser.profileImg);
    const image = Buffer.from(someUser.profileImg, 'base64');

    res.set('Content-Type', 'image/jpeg');
    res.send(image);

  } catch (err) {
    //res.status(500).send(err.message)
    return res.sendFile('public/noavatar.png', { root: './' });
  }
})

export default router;