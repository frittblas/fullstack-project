import users from '../../models/userModel.js';
import { comparePassword } from '../authentication/encryption.js';

async function login(username, password) {

    console.log("login function called!");

    const user = await users.findOne({ username });
    if (!user) {
        return 'Invalid username';
    }

    if (!comparePassword(password, user.password)) {
        return 'Invalid password';
    }

    return user;

}

export default login;