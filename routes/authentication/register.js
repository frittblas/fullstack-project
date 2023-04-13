import User from '../../models/userModel.js';
import express from 'express';




const router = express.Router();



async function register (firstname, lastname, username, email, password, programTitle ){
    console.log('register:', firstname, lastname, username, email, password, programTitle);

        const emailExists = await User.findOne({email});
        console.log('emailExists:', emailExists);

        const userNameExists = await User.findOne({ username: username.toLowerCase() });
        console.log('userNameExists:', userNameExists);

        const passwordLength = await User.findOne({password});
        console.log('passwordLength:', passwordLength);

        const programTitleExists= await User.findOne({programTitle});
        console.log('programTitleExists', programTitleExists);
       

        if(!firstname){
            return 'missing firstname';
        }

        if(!lastname){
            return 'missing lastname';
        }

        if(firstname.length >10){
            return 'firstname is too long';
        }

        if(firstname.length < 3){
            return 'firstname is too short';
        }
        if(lastname.length > 10 ){
            return 'lastname is too long';
        }

        if(lastname.length< 3){
            return 'lastname is too short';
        }

        if(emailExists){
            return 'Email is in our system';
        }


        if(userNameExists){
            return 'Username is taken';
        }

        if(passwordLength.length > 10){
            return 'Password is too long';
        }

        if(passwordLength.length <6){
            return 'Password is too short';
        }

        if(!programTitleExists){
            return 'Program does not exist'
        }

    
        const newUser = new user({
            firstname,
            lastname,
            username,
            email,
            password, 
            programTitle
        });

        const savedUser = await newUser.save();

        if (!savedUser) {
            return 'Registration failed';
        }

        return 'successfull registration';
    
    };

export default register;
