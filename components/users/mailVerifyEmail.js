const nodemailer = require("nodemailer");
require('dotenv').config();
exports.mailVerifyEmail = async function (url, account, token) {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'Eloop Verify Email <',
        to: account,
        subject: 'Xác nhận đăng ký',
        text: 'Bạn nhận được email này vì bạn (hoặc ai đó) đã đăng ký tài khoản.\n\n' +
            'Vui lòng nhấp vào liên kết sau hoặc dán liên kết này vào trình duyệt của bạn để hoàn tất quá trình đăng ký:\n\n' +
            url + '/user/verify/' + token + '\n\n' +
            'Nếu bạn không đăng ký tài khoản, vui lòng bỏ qua email này và tài khoản của bạn sẽ không bị thay đổi.\n'
    });

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}