var router = require('express').Router();
const passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res) {
  // where do you want to go for the root route?
  res.render('index', {title: 'Plant Diaries'});
  // This could be a landing page, or just redirect to your main resource page 
  // which you'll have an a tag that makes a request to `/auth/google` route below
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/plants', // where do you want the client to go after you login 
    failureRedirect : '/' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
