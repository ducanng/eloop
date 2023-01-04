const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy  = require('passport-google-oauth2');
const userController = require('../components/users/userController.js');
const db = require('../components/authGG/authGGRepository');
require('dotenv').config();
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userController.checkUserCredential(username, password);
  if (user)
    return cb(null, user);
  return cb(null, false);
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  passReqToCallback   : true
},
async function verify(request, accessToken, refreshToken, profile, cb) {
    //add user to database
    console.log(profile.id);   
    const user = await db.findUser(profile.emails[0].value);
    if (user === null) {
      if (await db.addUser(profile.id, profile.displayName, profile.emails[0].value)) {
        return cb(null, { id: profile.id, name: profile.displayName, account: profile.emails[0].value, verify: 'done' });
      } else {
        return cb(null, false);
      }
    } else {
      return cb(null, user);
    }  
  }
));
// used to serialize the user for the session
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, name: user.name, username: user.account, verify: user.verify });
  });
});

// used to deserialize the user
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;