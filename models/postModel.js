import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: String,
  message: String,
  image: String,
  replies: Array,
  date: Date,
  program: String
}, { collection: 'posts' })
 
const posts = mongoose.model("posts", postSchema);

export default posts;
