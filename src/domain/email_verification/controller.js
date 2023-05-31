const User = require('../user/model');
const { sendOTP, verifyOTP, deleteOTP } = require('../otp/controller');

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

const verifyUserEmail = async ({ email, otp }) => {
    try {
        const validOTP = await verifyOTP({ email, otp });
        if (!validOTP) {
            throw Error('Invalid code passed. Check your inbox.');
        }

        await User.updateOne({ email }, { verified: true });

        await deleteOTP(email);
        return;
    } catch (error) {
        throw error;
    }
}

module.exports = { sendEmailVerification, verifyUserEmail };