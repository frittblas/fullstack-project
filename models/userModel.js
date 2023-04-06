import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String,
  profileImg: String
}, { collection: 'users' })
 
const users = mongoose.model("users", userSchema);

export default users;
