import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  name: String,
  title: String,
  comment: String,
  image: String
}, { collection: 'about' })
 
const about = mongoose.model("about", aboutSchema);

export default about;