const User = require('../user/model');
const { sendOTP } = require('../otp/controller');

const sendEmailVerification = async (email) => {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw Error('There is no account for the provided email.');
        }

        const otpDetails = {
            email,
            subject: 'Email Verification',
            message: 'Verify your email with the code below.',
            duration: 1
        }

        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {
        throw error;
    }
}

module.exports = { sendEmailVerification };