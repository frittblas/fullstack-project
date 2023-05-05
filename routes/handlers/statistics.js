import Post from '../../models/postModel.js';
import Program from '../../models/programModel.js';
import User from '../../models/userModel.js';


async function getUsersPerProgram() {
  console.log("hmm")
  try {
    const users = await User.find({}, {profileImg: 0});
    const programs = await Program.find({});
    let programCounter;
    let resultArray = []
    
    for (let program of programs) {
      console.log(program.programTitle)
      programCounter = 0;
      console.log(program.programTitle)
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


export { getUsersPerProgram }