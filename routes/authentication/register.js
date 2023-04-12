
import express from 'express';
import User from '../../models/userModel.js';



const router = express.Router();



async function register (firstname, lastname, username, email, password, programTitle ){
   
        const emailExists = await User.findOne({email});
        const userNameExists = await User.findOne({username});
        const passwordLength = await User.findOne({password});
        const programTitleExists= await User.findOne({programTitle});
       

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


        if(!userNameExists){
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

        return 'successfull registration';
    
    };

export default register;