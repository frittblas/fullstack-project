import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  programTitle: String
}, { collection: 'programs' })
 
const programs = mongoose.model("programs", programSchema);

export default programs;