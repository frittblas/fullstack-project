import express from 'express';
import user from '../models/userModel.js';
import login from './authentication/login.js';
import register from './authentication/register.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await user.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/login', async (req,res)=>{
  const { username, password } = req.body;

  try {
    const message = await login(username, password);
    res.send(message);
  } catch (err) {
    res.status(500).send(err.message);
  }

})

router.post('/register', async (req, res)=>{

  try{
    const message = await register(firstname, lastname, username, email, password, programID, programTitle);
    res.send(message);
  }catch(err){
    res.status(500).send(err.message)
  }
})


export default router;