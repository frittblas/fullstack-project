import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: {
    _id: String,
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    program: String,
  },
  title: String,
  message: String,
  image: {
    name: String,
    type: String, 
    size: Number,
    contents: String
  },
  replies: Array,
  date: Date,
  program: String
}, { collection: 'posts' })
 
const posts = mongoose.model("posts", postSchema);

export default posts;
