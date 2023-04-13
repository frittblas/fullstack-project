import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
  programTitle: String,
  profileImg: String
}, { collection: 'users' })
 
const users = mongoose.model("users", userSchema);

export default users;
