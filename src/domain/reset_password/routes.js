const express = require('express');
const router = express.Router();
const { sendPasswordResetEmail } = require('./controller');

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw Error('An email is required.');
        }

        const createdResetOTP = await sendPasswordResetEmail(email);
        res.status(200).json(createdResetOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;