const User = require('../user/model');
const { sendOTP } = require('../otp/controller');

const sendPasswordResetEmail = async (email) => {
    try {
        const existentUser = await User.findOne({ email });
        if (!existentUser) {
            throw Error('There is no account for the provided email.');
        }
        if (!existentUser.verified) {
            throw Error("Email hasn't been verified yet. Check yout inbox.");
        }

        const otpDetails = {
            email,
            subject: "Password Reset",
            message: "Enter the code below to reset your password.",
            duration: 1
        }
        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {
        throw error;
    }
}

module.exports = { sendPasswordResetEmail };