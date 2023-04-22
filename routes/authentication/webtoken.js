import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

app.post('/LOGIN', async (req, res) => {
  let result;
  console.log("LOGIN req.body = ", req.body);

  if (req.body.user_name !== '' && req.body.user_password !== '') {
    try {

      try {
        result = await db.getUser(req.body.user_name, req.body.user_password);
        console.log("getUser result: ", result);
      } catch (error) {
        console.log("getUser db error: ", error);
      }

      console.log("req.body.user_password = ", req.body.user_password);
      console.log("result.password = ", result.password);
      if (req.body.user_password == result.password) {

        // render the start page and log the token
        console.log("login: true");
        let token = jwt.sign({ username: req.body.user_name, role: result.role }, process.env.ACCESS_TOKEN_SECRET);
        console.log("token: ", token);

        // authenticate
        currentKey = token;

        res.cookie('access_token', token, {
          httpOnly: true,
          maxAge: 600000 // set cookie to expire in 10 minutes
        });

        res.redirect("/granted");

        return; // return function

      } else {
        console.log("login: false");
        res.render("fail.ejs");
        return;
      }

    } catch (error) {
      console.log("LOGIN error: ", error);
    }

    req.method = 'GET';
    res.redirect("/");

  }

});

// log out by clearing the access token and redirecting to login page
app.get('/logout', (req, res) => {
  res.clearCookie('access_token');
  res.redirect('/');
});

function authenticateToken(allowedRoles) {
  return async (req, res, next) => {
    try {
      const token = req.cookies['access_token'];
      if (!token) {
        return res.redirect('/'); // redirect to login page if access token is not provided
      }
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
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