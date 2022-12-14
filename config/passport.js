const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userController = require('../users/userController.js');
//Check user
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  console.log(username, password);
  const user = await userController.checkUserCredential(username, password);
  if (user)
    return cb(null, user);
  return cb(null, false);
}));
//Send cookie
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, name: user.name, account: user.account });
  });
});
//Receive cookie
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

module.exports = passport;