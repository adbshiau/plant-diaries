const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    // console.log(profile);
    // console.log('this is the profile ^ from google --------------------------------------------------');
    // has the user logged in with oauth before?
    User.findOne({googleId: profile.id}, function(err, user) {
      // if user is defined, then we found someone who logged in before
      if (user) return cb(null, user); // passes the info to the next spot in the middleware chain
      // if user is undefined, then they've never logged in
      if (err) return cb(err);
      // if user is undefined, create a user
      User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      }, function(err, createdUser) {
        if (createdUser) return cb(null, createdUser);
        if (err) return cb(null);
      })
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  User.findById(id, function(err, user) {
    if (err) return done(err);
    done (null, user);
  })
  // When you call this done function, passport assigns the user document to 
  // req.user, which will be availible in every Single controller function,
  // so you always know the logged in user
});



