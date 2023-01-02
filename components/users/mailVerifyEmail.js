const nodemailer = require("nodemailer");

exports.mailVerifyEmail = async function (url ,account, token) {
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
        to: account,
        subject: 'Xác nhận đăng ký',
        text: 'Bạn nhận được email này vì bạn (hoặc ai đó) đã đăng ký tài khoản.\n\n' +
            'Vui lòng nhấp vào liên kết sau hoặc dán liên kết này vào trình duyệt của bạn để hoàn tất quá trình đăng ký:\n\n' +
            'http://' + url + '/user/verify/' + token + '\n\n' +
            'Nếu bạn không đăng ký tài khoản, vui lòng bỏ qua email này và tài khoản của bạn sẽ không bị thay đổi.\n'
    });

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}