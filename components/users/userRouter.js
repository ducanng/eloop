const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');
const userController = require('./userController');

//Register
router.get('/signup', userController.showSignUp);
router.post('/signup', userController.signUp);
//Check Availability
router.post('/signup/checkAvailability', userController.checkAvailability);
// Login
router.get('/signin', userController.showSignIn);
router.post('/signin', userController.signIn);
//Logout
router.get('/logout', userController.isLoggedIn, userController.logout);
//Infomation
router.get('/info', userController.isLoggedIn, userController.showInfo);
router.post('/info', userController.isLoggedIn, userController.updateInfo);
router.post('/password', userController.isLoggedIn, userController.changePassword);
//Forgot Password
router.get('/forgot', userController.showForgotPassword);
router.post('/forgot', userController.forgotPassword);

router.get('/reset/:token', userController.showResetPassword);
router.post('/reset/:token', userController.resetPassword);
module.exports = router;