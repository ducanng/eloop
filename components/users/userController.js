const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { user } = require("../../models/user.js")
const mail = require('./mailForgotPassword.js')
const sessionStorage = require('sessionstorage')
const { findUser, addUser, updateInfoUser, updatePasswordUser
    , updateTokenUser, findUserByToken } = require('./userRepository.js')
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
            req.flash('message', 'Đăng ký thành công!');
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
exports.signIn = async (req, res, next) => {
    const account = req.body.username;
    const password = req.body.password;
    var redirectTo = req.session.redirectTo;

    const user = await exports.checkUserCredential(account, password);
    if (user) {
        console.log('User is exist!' + req);
        req.login(user, function (err) {
            if (err) { return next(err); }
            console.log('redirectTo: ' + redirectTo);
            // delete the session cookie so it is not present on the next request
            delete req.session.redirectTo;
            req.flash('message', 'Đăng nhập thành công!');
            // redirecting the user to where they want to go
            res.redirect(redirectTo || '/');
        });
    } else {
        res.render('features/signin', { error: 'Sai tài khoản hoặc mật khẩu!' });
    }
}
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.redirectTo = req.originalUrl;
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
    const user = await findUser(req.user.username)
    console.log('fullname1: ' + user);
    res.render('users/info', { user: user });
}
exports.updateInfo = async (req, res, next) => {
    let fullname = req.body.name
    let phonenumber = req.body.phone
    let account = req.user.username
    let address = req.body.address

    const user = await findUser(account)

    if (fullname !== user.name || phonenumber !== user.phone_number || address !== user.address) {
        if (await updateInfoUser(account, fullname, address, phonenumber)) {
            res.send(`<script>alert("Cập nhật thông tin thành công!"); window.location.href = "${req.originalUrl}"; </script>`);
        } else {
            res.send(`<script>alert("Cập nhật thông tin thất bại"); window.location.href = "${req.originalUrl}"; </script>`);
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

exports.changePassword = async (req, res, next) => {
    const currentPassword = req.body.password
    const newPassword = req.body.newpassword
    const reNewPassword = req.body.renewpassword
    const account = req.user.username

    console.log(currentPassword);
    console.log(newPassword);
    console.log(reNewPassword);
    const user = await findUser(account)
    if (await bcrypt.compare(currentPassword, user.password)) {
        if (newPassword === reNewPassword) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newPassword, salt);
            if (await updatePasswordUser(account, hash)) {
                res.render('users/info', { success: 'Đổi mật khẩu thành công!', user: user });
            } else {
                res.render('users/info', { error: 'Đổi mật khẩu thất bại!', user: user });
            }
        } else {
            res.render('users/info', { error: 'Mật khẩu mới không khớp!', user: user });
        }
    }
    else {
        res.render('users/info', { error: 'Mật khẩu hiện tại không đúng!', user: user });
    }
}

exports.checkAvailability = async (req, res, next) => {
    const account = req.body.username;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(account)) {
        const user = await findUser(account)
        if (user) {
            res.send('false');
        } else {
            res.send('true');
        }
    } else {
        res.send('notEmail');
    }
}

exports.showForgotPassword = (req, res, next) => {
    res.render('features/forgotpass');
}
exports.forgotPassword = async (req, res, next) => {
    const account = req.body.username;
    const user = await findUser(account)
    if (user) {
        const token = await crypto.randomBytes(20).toString('hex');
        console.log("Token: " + token);
        console.log("Account: " + account);
        if (await updateTokenUser(account, token)) {
            await mail.mailForgotPassword(req.headers.host, account, token);
            res.render('features/forgotpass', { success: 'Vui lòng kiểm tra email để đổi mật khẩu!' });
        } else {
            res.render('features/forgotpass', { error: 'Đổi mật khẩu thất bại!' });
        }
    } else {
        res.render('features/forgotpass', { error: 'Tài khoản không tồn tại!' });
    }
}

exports.showResetPassword = async (req, res, next) => {
    const token = req.params.token;
    const user = await findUserByToken(token)
    sessionStorage.setItem('account', user.account);
    if (user) {
        res.render('features/resetpass', { token: token });
    } else {
        res.render('features/resetpass', { error: 'Đường dẫn không đúng!' });
    }
}

exports.resetPassword = async (req, res, next) => {
    const password = req.body.password;
    const rePassword = req.body.confirm_password;
    let account = sessionStorage.getItem('account');
    let flag = false;
    if (account) {
        flag = true
    } else {
        const token = req.params.token;
        const user = await findUserByToken(token)
        account = user.account;
        if (user) {
            flag = true
        } else {
            flag = false
        }
    }
    console.log(flag);
    if (flag) {
        if (password === rePassword) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            if (await updatePasswordUser(account, hash)) {
                await updateTokenUser(account, null);
                res.render('features/resetpass', { success: 'Đổi mật khẩu thành công!' });
            } else {
                res.render('features/resetpass', { error: 'Đổi mật khẩu thất bại!' });
            }
        } else {
            res.render('features/resetpass', { error: 'Mật khẩu không khớp!' });
        }
    } else {
        res.render('features/resetpass', { error: 'Đường dẫn không đúng!' });
    }
}