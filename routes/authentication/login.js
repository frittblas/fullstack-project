
import users from '../../models/userModel.js';




async function login(username, password){

    const user= await users.findOne({username});
    if(!user){
        return 'Invalid username';
    }

    if(user.password !== password){
        return 'Invalid password';
    }

  
    return 'Successfully logged in';
    
}

export default login;