const nodemailer = require('nodemailer');
const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`${success}: Ready for messages.`);
    }
})

const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        throw error;
    }
}

module.exports = sendEmail;