const passport = require('passport');
const LocalStrategy = require('passport-local');
const userController = require('../components/users/userController.js');

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userController.checkUserCredential(username, password);
  if (user)
    return cb(null, user);
  return cb(null, false);
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, name: user.name, username: user.account});
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

module.exports = passport;