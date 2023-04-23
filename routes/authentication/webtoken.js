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
  return async (req, res, next) => {
    try {
      const token = req.cookies['access_token'];
      if (!token) {
        return res.redirect('/login'); // redirect to login page if access token is not provided
      }
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
      const { username, program } = decodedToken;
      if (!allowedPrograms.includes(program)) {
        return res.status(401).send('Unauthorized. Please go to "/login"');
      }
      req.user = { username, program };

      // restrict the students so they only can check their own page.
      if (program !== 'admin') {
        if (req.path === '/student1' && req.user.username !== 'user1') {
          return res.status(401).send('Unauthorized. You do not have access to this page.');
        }
        if (req.path === '/student2' && req.user.username !== 'user2') {
          return res.status(401).send('Unauthorized. You do not have access to this page.');
        }
      }

      next();
    } catch (error) {
      console.log('Error in authenticateToken:', error.message);
      res.redirect('/login'); // redirect to login page if the access token is not valid
    }
  };
}

export { signJWT, clearJWT, authenticateJWT };