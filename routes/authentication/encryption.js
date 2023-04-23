import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

async function encryptPassword(pwd) {

  let enc = await bcrypt.hash(pwd, 10);
  console.log("encrypted pw: ", enc);

  return enc;

}

async function comparePassword(inputPwd, dbPwd) {

  if (await bcrypt.compare(inputPwd, dbPwd)) {
    console.log("Pwd compare success: ", inputPwd, dbPwd);
    return true;
  }
  else {
    console.log("Pwd compare fail: ", inputPwd, dbPwd);
    return false;
  }

}

export { encryptPassword, comparePassword };