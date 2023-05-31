const User = require('../user/model');
const { sendOTP, verifyOTP, deleteOTP } = require('../otp/controller');
const { hashData } = require('../../util/hashData');

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
            subject: 'Password Reset',
            message: 'Enter the code below to reset your password.',
            duration: 1
        }
        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {
        throw error;
    }
}

const resetUserPassword = async ({ email, otp, newPassword }) => {
    try {
        const validOTP = await verifyOTP({ email, otp });
        if (!validOTP) {
            throw Error('Invalid codepassed. Check your inbox.');
        }
        if (newPassword.length < 6) {
            throw Error('Password is too short!');
        }

        const hashedPassword = await hashData(newPassword);
        await User.updateOne({ email }, { password: hashedPassword });

        await deleteOTP(email);
        return;
    } catch (error) {
        throw error;
    }
}

module.exports = { sendPasswordResetEmail, resetUserPassword };