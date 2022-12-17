const bcrypt = require('bcryptjs');
const { user } = require("../models/user.js")
const {findUser,addUser,removeUser,updateInfoUser,updateAccountUser,updatePasswordUser,findUserId} = require('../users/userRepository.js')
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
        var user = {
            name: fullname,
            account: account,
        };
        req.login(user, function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    } else {
        console.log('User is not added!')
        res.render('features/signup', { error: 'Đăng ký thất bại!', name: fullname, phone: phonenumber, email: account });
    }
}

exports.showSignIn = (req, res, next) => {
    res.render('features/signin');
}
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/signin');
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
    console.log(req.user)
    const user = await findUser(req.user.username)
    res.render('users/info', { user: user });
}
exports.updateInfo = async (req, res, next) => {
    const fullname = req.body.fullName
    const phonenumber = req.body.Phone
    const account = req.body.Email
    const address = req.body.Address
    const user = await findUser(req.user.username)
    if (fullname !== user.name || phonenumber !== user.phone_number || address !== user.address) {
        if (fullname === null || fullname === '') {
            fullname = user.name
        }
        if (phonenumber === null) {
            phonenumber = user.phone_number
        }
        if (address === null) {
            address = user.address
        }
        if (updateInfoUser(account, fullname, address, phonenumber)) {
            res.redirect('/user/info')
        } else {
            res.render('users/info', { error: 'Cập nhật thất bại!', user: user });
        }
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