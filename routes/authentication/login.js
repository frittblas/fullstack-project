
import user from '..routes/models/userModel.js';

const UserLogin = mongoose.model('UserLogin', user);


async function login(username, password){

    const user= await UserLogin.findOne({username});
    if(!user){
        return 'Invalid username';
    }

    const passwordValid = await user.comparePassword(password);
    if(!passwordValid){
        return 'Invalid password';
    }

  
    return 'Successfully logged in';
    
}

export default login;