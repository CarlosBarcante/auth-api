const express = require('express');
const router = express.Router();
const { sendEmailVerification } = require('./controller');

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

module.exports = router;