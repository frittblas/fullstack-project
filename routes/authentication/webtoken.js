import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function signJWT(res, user) {
  //create new user variable for the token
  const userForToken = {
    _id: user._id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    program: user.programTitle
  };


  let token = await jwt.sign({ user: userForToken }, process.env.JWT_TOKEN);
  console.log("token: ", token);

  // create the cookie as access_token
  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 600000 // set cookie to expire in 10 minutes
  });


}

// log out by clearing the access token and redirecting to login page
function clearJWT(res) {
  res.clearCookie('access_token');
  //return res.redirect('/login');
}

function authenticateJWT(allowedPrograms) {
  //console.log('called authJWT! type of allowed programs: ', typeof (allowedPrograms));
  return async (req, res, next) => {
    try {
      const token = req.cookies['access_token'];
      if (!token) {
        console.log('No token!');
        res.status(401).send("No token!");
        return false; // no token, return false
      }
      const decodedToken = await jwt.verify(token, process.env.JWT_TOKEN);
      const { username, program } = decodedToken.user;

      if (!allowedPrograms.includes(program)) {
        console.log('Program not allowed!');
        res.status(403).send("You don't have access to this!");
        return false; // no right to be here, return false
      }

      req.user = { username, program }; // not used atm

      next();
    } catch (error) {
      console.log('Error in authenticateJWT:', error.message);
    }
  };
}

//Decrypt a token and return it
function decryptJWT(token) {
  const decryptedToken = jwt.verify(token, process.env.JWT_TOKEN);
  return decryptedToken;
}

export { signJWT, clearJWT, authenticateJWT, decryptJWT };