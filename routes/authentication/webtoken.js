import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

let currentKey = "";

function signJWT(username, program) {
  let result;
  console.log("LOGIN username, program = ", username, program);

  console.log("login: true");
  let token = jwt.sign({ username: username, program: program }, process.env.TOKEN);
  console.log("token: ", token);

  // authenticate
  currentKey = token;

  // create the cookie as access_token
  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 600000 // set cookie to expire in 10 minutes
  });

  // res.redirect("/granted");

  return; // return function


}

// log out by clearing the access token and redirecting to login page
function clearJWTCookie() {
  res.clearCookie('access_token');
  res.redirect('/');
}

function authenticateToken(allowedRoles) {
  return async (req, res, next) => {
    try {
      const token = req.cookies['access_token'];
      if (!token) {
        return res.redirect('/'); // redirect to login page if access token is not provided
      }
      const decodedToken = jwt.verify(token, process.env.TOKEN);
      const { username, role } = decodedToken;
      if (!allowedRoles.includes(role)) {
        return res.status(401).send('Unauthorized. Please go to "/identify" to log in with a user that has access to this page.');
      }
      req.user = { username, role };

      // restrict the students so they only can check their own page.
      if (role !== 'admin' && role !== 'teacher') {
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
      res.redirect('/'); // redirect to login page if the access token is not valid
    }
  };
}