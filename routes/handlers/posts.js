import Post from '../../models/postModel.js';
import User from '../../models/userModel.js';

async function getPosts(all, token) {
  let program;
  if (parseInt(all) === 1) {
     program = "All";
  } else if (parseInt(all) === 0) {
    program = token.program;
  } else {
    return;
  }

  const posts = await Post.aggregate([
    {
      $match: {
        program: program
      }
    },
    {
      $lookup: {
        from: User.collection.name,
        localField: 'author',
        foreignField: 'username',
        as: 'User'
      }
    },
    {
      $unwind: '$User'
    },
    //fields to be included
    {
      $project: {
        _id: 1,
        title: 1,
        message: 1,
        author: {
          _id: '$User._id',
          username: '$User.username',
          firstname: '$User.firstname',
          lastname: '$User.lastname',
          program: '$User.programTitle'
          },
        date: 1,
      }
    },
    {
      $sort: { date: -1 }
    }
  ]);

  return posts;
}



export { getPosts };