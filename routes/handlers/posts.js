import Post from '../../models/postModel.js';
import User from '../../models/userModel.js';
import { ObjectId } from 'mongodb';



async function getPosts(all, token) {
  let program;
  if (parseInt(all) === 1) {
     program = "All";
  } else if (parseInt(all) === 0) {
    program = token.user.program;
  } else {
    return;
  }

  console.log("Program", program)



  const posts = await Post.find({ program: program }, { image: 0 }).sort({ date: -1 });

  return posts;
}


async function getPostById(id, token) {
  const objId = new ObjectId(id);

  const post = await Post.find({ _id: objId }, { image: 0 }).sort({ date: -1 });


  return post[0];
}



export { getPosts, getPostById};