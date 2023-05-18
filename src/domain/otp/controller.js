const OTP = require('./model');
const generateOTP = require('../../util/generateOTP');
const sendEmail = require('../../util/sendEmail');
const { hashData } = require('../../util/hashData');
const { AUTH_EMAIL } = process.env;

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    try {
        if (!(email && subject && message)) {
            throw Error('Provide values for email, subject and message.');
        }

        await OTP.deleteOne({ email });

        const generatedOTP = await generateOTP();

        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p>
            <p style='color:tomato; font-size: 25px; letter-spacing: 2px;'><b>${generatedOTP}</b></p>
            <p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
        }
        await sendEmail(mailOptions);

        const hashedOTP = await hashData(generatedOTP);
        const newOTP = new OTP({
            email,
            otp: hashedOTP,
            expiresAt: Date.now() + 3600000 * +duration,
        })

        const createdOTP = await newOTP.save();
        return createdOTP;
    } catch (error) {
        throw error;
    }
}

module.exports = { sendOTP };