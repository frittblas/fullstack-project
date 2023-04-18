
import users from '../../models/userModel.js';

async function login(username, password) {

    console.log("login function called!");

    const user = await users.findOne({ username });
    if (!user) {
        return 'Invalid username';
    }

    if (user.password !== password) {
        return 'Invalid password';
    }


    return 'Successfully logged in';

}

export default login;