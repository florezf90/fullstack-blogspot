const withAuth = (req, res, next) => {
  // if the user is not logged in, redirect to the login route handler.
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
