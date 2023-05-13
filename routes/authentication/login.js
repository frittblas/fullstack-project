import users from '../../models/userModel.js';
import { comparePassword } from '../authentication/encryption.js';
import { signJWT } from '../authentication/webtoken.js';

async function login(res, username, password) {

  const user = await users.findOne({ username: {  $regex: new RegExp('\\b' + username + '\\b', 'i') } });
  if (!user) {
    return { message: 'Invalid username' };
  }


  const cmpSuccess = await comparePassword(password, user.password);
  if (!cmpSuccess) {
    return { message: 'Invalid password' };
  }

  await signJWT(res, user);

  return user;

}

export default login;