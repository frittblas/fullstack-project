import Post from '../../models/postModel.js';
import Program from '../../models/programModel.js';
import User from '../../models/userModel.js';


async function getUsersPerProgram() {
  try {
    const users = await User.find({}, {profileImg: 0});
    const programs = await Program.find({});
    let programCounter;
    let resultArray = []
    
    for (let program of programs) {

      programCounter = 0;

      for (let user of users) {
        if (user.programTitle === program.programTitle) {
          programCounter++;
        }
      }
      let programObj = { program: program.programTitle, numberOfUsers: programCounter }
      resultArray.push(programObj)

    }

    return resultArray;
  } catch (err) {
    return err;
  }
}

async function getPostsPerProgram() {
  try {
    const posts = await Post.find({}, {image: 0});
    const programs = await Program.find({}).sort({ programTitle: 1 });

    programs.push({ programTitle: "All" });


    let programCounter;
    let resultArray = []
    
    for (let program of programs) {

      programCounter = 0;

      for (let post of posts) {
        if (post.program === program.programTitle) {
          programCounter++;
        }
      }
      let programObj = { program: program.programTitle, numberOfPosts: programCounter }
      resultArray.push(programObj)
    }

  

    return resultArray;
  } catch (err) {
    return err;
  }
}

async function getNumberOfUsers() {
  try {
    const users = await User.find({ programTitle: { $ne: "admin" }}, { profileImg: 0 });

    return users.length;
  } catch (err) {
    return err;
  }
}

async function getNumberOfPosts() {
  try {
    const posts = await Post.find({ program: { $ne: "admin" }}, { image: 0 });


    return posts.length;
  } catch (err) {
    return err;
  }
}


export { getUsersPerProgram, getPostsPerProgram, getNumberOfPosts, getNumberOfUsers}