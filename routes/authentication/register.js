import User from '../../models/userModel.js';
import express from 'express';

const router = express.Router();


async function validateUserInput(firstname, lastname, username, email, password, programTitle) {
    if (!firstname || !lastname || !username || !email || !password || !programTitle) {
      return 'Missing required fields';
    }
  
    if (firstname.length > 10) {
      return 'Firstname is too long';
    }
  
    if (firstname.length < 3) {
      return 'Firstname is too short';
    }
  
    if (lastname.length > 10) {
      return 'Lastname is too long';
    }
  
    if (lastname.length < 3) {
      return 'Lastname is too short';
    }
  
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return 'Email is in our system';
    }
  
    const userNameExists = await User.findOne({ username });
    if (userNameExists) {
      return 'Username is taken';
    }
  
   
    if (password.length > 10) {
      return 'Password is too long';
    }
  
    if (password.length < 6) {
      return 'Password is too short';
    }
  
    if(!password){
        return 'Password empty';
    }
    const programTitleExists = await User.findOne({ programTitle });
    if (!programTitleExists) {
      return 'Program does not exist';
    }
  
    return null;
  }
  
  async function createNewUser(firstname, lastname, username, email, password, programTitle) {
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password,
      programTitle,
    });
  
    try {
      await newUser.validate();
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      return 'Validation error';
    }
  }
  
  async function register(firstname, lastname, username, email, password, programTitle) {
    const validationError = await validateUserInput(firstname, lastname, username, email, password, programTitle);
    if (validationError) {
      return validationError;
    }
  
    console.log('register:', firstname, lastname, username, email, password, programTitle);
  
    const newUser = await createNewUser(firstname, lastname, username, email, password, programTitle);
    return newUser;
  }
  

export default register;
