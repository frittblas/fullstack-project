import User from '../../models/userModel.js';
import express from 'express';

const router = express.Router();


async function register (firstname, lastname, username, email, password, programTitle ){
    console.log('register:', firstname, lastname, username, email, password, programTitle)
    const newUser = await User.create ({
        firstname,
        lastname,
        username,
        email,
        password, 
        programTitle
    });
    return newUser;
    };

export default register;
