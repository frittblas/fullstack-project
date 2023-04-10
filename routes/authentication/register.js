import express from 'express';
import user from '..routes/models/userModel.js';


const express = require ('express');
const router = express.Router();
const user = require('..routes/models/userModel.js');


router.post('/register', async(req, res)=>{
    const {firstname, lastname, username, email, password, programID, programTitle } = req.body;

    try{
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: 'Email is already in our system'});
        }

        const newUser = new user({
            firstname,
            lastname,
            username,
            email,
            password, 
            programID,
            programTitle
        });

        const savedUser = await newUser.save();

        res.status(201).json({message: 'Registration successfull'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
});

module.exports = router; 
