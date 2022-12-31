const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');
const userController = require('./userController');

//Register
router.get('/signup', userController.showSignUp);
router.post('/signup', userController.signUp);
// Login

router.get('/signin', userController.showSignIn);
router.post('/signin', userController.signIn);

//userController.signIn);
router.get('/logout', userController.isLoggedIn, userController.logout);
// router.post('/change_password', userController.postUserChangePassword)
/* GET home page. */
router.get('/info', userController.isLoggedIn, userController.showInfo);
router.post('/info', userController.isLoggedIn, userController.updateInfo);

router.post('/password', userController.isLoggedIn, userController.changePassword);
router.post('/signup/checkAvailability', userController.checkAvailability);
module.exports = router;