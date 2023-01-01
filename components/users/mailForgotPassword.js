const nodemailer = require("nodemailer");

exports.mailForgotPassword = async function (host,email, token) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <',
        to: email,
        subject: 'Đổi mật khẩu',
        text: 'Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu đổi mật khẩu cho tài khoản của bạn.\n\n' +
            'Vui lòng nhấp vào liên kết sau hoặc dán liên kết này vào trình duyệt của bạn để hoàn tất quá trình đổi mật khẩu:\n\n' +
            'http://' + host + '/user/reset/' + token + '\n\n' +
            'Nếu bạn không yêu cầu đổi mật khẩu, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.\n'
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user:'ducan172002@gmail.com',
//         pass: 'ducan172002'
//     },
//     tls: {
//         rejectUnauthorized: false
//     },
// });
// const mailOptions = {
//     from: 'ducan172002@gmail.com',
//     to: account,
//     subject: 'Đổi mật khẩu',
//     text: 'Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu đổi mật khẩu cho tài khoản của bạn.\n\n' +
//         'Vui lòng nhấp vào liên kết sau hoặc dán liên kết này vào trình duyệt của bạn để hoàn tất quá trình đổi mật khẩu:\n\n' +
//         'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//         'Nếu bạn không yêu cầu đổi mật khẩu, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.\n'
// };
// transporter.sendMail(mailOptions, function (err) {
//     if (err) {
//         console.log(err);
//     }
// });