const express = require('express');
const router = express.Router();
const { createUser, authUser } = require('./controller');
const auth = require('../../middleware/auth');
const { sendEmailVerification } = require('../email_verification/controller');

router.post('/signup', async (req, res) => {
    try {
        let { name, email, password } = req.body;
        name = name.trim();
        email = email.trim();
        password = password.trim();

        if (!(name && email && password)) {
            throw Error('Empty input fields!');
        }
        if (!/^[a-zA-ZçÇ\s]*$/.test(name)) {
            throw Error('Invalid name entered!');
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw Error('Invalid email entered!');
        }
        if (password.length < 6) {
            throw Error('Password is too short!');
        }

        const newUser = await createUser({ name, email, password });
        await sendEmailVerification(email);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        if (!(email && password)) {
            throw Error('Empty credentials supplied!');
        }

        const authenticatedUser = await authUser({ email, password });
        res.status(200).json(authenticatedUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// protected route
router.get('/private_data', auth, (req, res) => {
    res.status(200).send(`You're in private territory of ${req.currentUser.email}`);
})

module.exports = router;