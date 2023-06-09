import express from 'express';
import User from '../../models/userModel.js';
import Program from '../../models/programModel.js';
import { encryptPassword } from '../authentication/encryption.js';
//import { signJWT } from '../authentication/webtoken.js';

const router = express.Router();


// some user name limitations
const maxLen = 32;
const minLen = 2;
const pwdMinLen = 6;

async function validateUserInput(firstname, lastname, username, email, password, programTitle) {
  if (
    !firstname ||
    !lastname ||
    !username ||
    !email ||
    !password ||
    !programTitle
  ) {
    return 'Missing required fields';
  }

  if (firstname.length > maxLen) {
    return 'Firstname is too long';
  }

  if (firstname.length < minLen) {
    return 'Firstname is too short';
  }

  if (lastname.length > maxLen) {
    return 'Lastname is too long';
  }

  if (lastname.length < minLen) {
    return 'Lastname is too short';
  }

  if (username.length > maxLen) {
    return 'Username is too long';
  }

  if (username.length < minLen) {
    return 'Username is too short';
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return 'Email is in our system';
  }

  const userNameExists = await User.findOne({ username: {  $regex: new RegExp('\\b' + username + '\\b', 'i') } });
  if (userNameExists) {
    return 'Username is taken';
  }


  if (password.length > maxLen) {
    return 'Password is too long';
  }

  if (password.length < pwdMinLen) {
    return 'Password is too short';
  }

  const programTitleExists = await Program.findOne({ programTitle });
  if (!programTitleExists) {
    return 'Program does not exist';
  }

  return null;
}

async function createNewUser(user) {

  const newUser = new User({
    ...user
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

async function register(res, user) {

  const validationError = await validateUserInput(
    user.firstname,
    user.lastname,
    user.username,
    user.email,
    user.password,
    user.programTitle
  );


  if (validationError) {
    return { message: validationError };
  }

  //capitalize first and last name
  const capitalizedFirstname = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1).toLowerCase();
  const capitalizedLastname = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1).toLowerCase();
  user.firstname = capitalizedFirstname;
  user.lastname = capitalizedLastname;


  // encrypt password
  user.password = await encryptPassword(user.password);


  const newUser = await createNewUser(user);

  // create token
  //await signJWT(res, user.username, user.programTitle);

  return newUser;

}


export default register;
