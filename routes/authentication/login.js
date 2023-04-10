
import user from '..routes/models/userModel.js';

const UserLogin = mongoose.model('UserLogin', user);


async function login(username, password){
try{
    const user= await UserLogin.findOne({username});
    if(!user){
        throw new Error('Invalid username');
    }

    const passwordValid = await user.comparePassword(password);
    if(!passwordValid){
        throw new Error('Invalid password');
    }

return user;

}catch(error){
        throw new Error('Login failed: ${error.message}')
    }
}