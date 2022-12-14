const bcrypt = require('bcryptjs');
const { user } = require("../models/user.js")
const { findUser, addUser, removeUser, updateUser, findUserId } = require('../users/userRepository.js')
exports.showSignUp = (req, res, next) => {
    res.render('features/signup');
}

exports.signUp = async (req, res, next) => {
    console.log(req.body);
    fullname = req.body.name
    phonenumber = req.body.phone
    account = req.body.username
    password = req.body.password
    repassword = req.body.confirm_password
    console.log(fullname, phonenumber, account, password, repassword)

    if (password !== repassword) {
        console.log('Password is not match!')
        res.render('features/signup', { error: 'Mật khẩu không khớp!', name: fullname, phone: phonenumber, email: account });
        return;
    }
    const existUser = await findUser(account)
    if (existUser !== null) {
        console.log('User is exist!')
        res.render('features/signup', { error: 'Tài khoản đã tồn tại!', name: fullname, phone: phonenumber });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    if (addUser(fullname, account, hash, phonenumber)) {
        res.redirect('/')
    } else {
        console.log('User is not added!')
        res.render('features/signup', { error: 'Đăng ký thất bại!', name: fullname, phone: phonenumber, email: account });
    }
}

exports.showSignIn = (req, res, next) => {
    res.render('features/signin');
}
/**
 * Check user credential and return the user info, otherwise null
 * @param email
 * @param password
 * @returns {Promise<Object|null>}
 */
exports.checkUserCredential = async (account, password) => {
    const user = await findUser(account)
    if (!user) return null;
    if (await bcrypt.compare(password, user.password))
        return user;
    return null;
}

exports.showInfo = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const user = await findUser(req.user.account)
        res.render('users/info', { user: user });
    } else {
        res.redirect('/user/signin');
    }
}
exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};