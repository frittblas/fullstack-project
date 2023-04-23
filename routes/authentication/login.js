import users from '../../models/userModel.js';
import { comparePassword } from '../authentication/encryption.js';
import { signJWT, clearJWT } from '../authentication/webtoken.js';

async function login(res, username, password) {

    console.log("login function called!");

    const user = await users.findOne({ username });
    if (!user) {
        return 'Invalid username';
    }

    const cmpSuccess = await comparePassword(password, user.password);
    if (!cmpSuccess) {
        return 'Invalid password';
    }

    await signJWT(res, user.username, user.programTitle);

    //clearJWT(res);

    return user;

}

export default login;