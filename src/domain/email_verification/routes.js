const express = require('express');
const router = express.Router();
const { sendEmailVerification, verifyUserEmail } = require('./controller');

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw Error('An email is required.');
        }

        const createdEmailVerification = await sendEmailVerification(email);
        res.status(200).json(createdEmailVerification);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post('/verify', async (req, res) => {
    try {
        let { email, otp } = req.body;
        if (!(email && otp)) {
            throw Error('Provide values for email and otp.');
        }

        await verifyUserEmail({ email, otp });
        res.status(200).json({ email, verified: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;