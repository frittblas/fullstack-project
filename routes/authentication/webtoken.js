import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function signJWT(res, username, program) {

  console.log("LOGIN username, program = ", username, program);

  let token = await jwt.sign({ username: username, program: program }, process.env.JWT_TOKEN);
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
      const { username, program } = decodedToken;
      if (!allowedPrograms.includes(program)) {
        console.log('Program not allowed!');
        res.status(401).send("You don't have access to this!");
        return false; // no right to be here, return false
      }

      req.user = { username, program };

      // restrict the students so they only can check their own page.
      if (program !== 'admin') {
        if (req.path === '/admin' && req.user.username !== 'admin') {
          console.log('Only admin have access to admin!');
          return false; // only admin can access /admin
        }
      }
      console.log('next reached in authJWT!');
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