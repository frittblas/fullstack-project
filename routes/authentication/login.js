
import users from '../../models/userModel.js';
import user from '../../models/userModel.js';
import mongoose from 'mongoose';

//const UserLogin = mongoose.model('UserLogin', user);


async function login(username, password){

    const FindUser= await users.findOne({username});
    if(!FindUser){
        return 'Invalid username';
    }

    const passwordValid = await users.comparePassword(password);
    if(!passwordValid){
        return 'Invalid password';
    }

  
    return 'Successfully logged in';
    
}

export default login;