const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const userController = require('../users/userController');

//Register
router.get('/signup', userController.showSignUp);
router.post('/signup', userController.signUp);
// Login
router.get('/', userController.showSignIn);
router.get('/signin', userController.showSignIn);
router.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/signin',
}));
//userController.signIn);
router.get('/logout', userController.logout);
// router.post('/change_password', userController.postUserChangePassword)
/* GET home page. */
router.get('/info', function(req, res, next) {
  res.render('users/info');
});

module.exports = router;