// auth.js

// Middleware function to check if user is authenticated
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      // If user is not logged in, redirect to the login page
      res.redirect('/login');
    } else {
      // If user is logged in, proceed to the next middleware or route handler
      next();
    }
  };
  
  module.exports = withAuth;
  