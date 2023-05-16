const express = require('express');
const router = express.Router();
const { createUser } = require('./controller');

router.post('/signup', async (req, res) => {
    try {
        let { name, email, password } = req.body;
        name = name.trim();
        email = email.trim();
        password = password.trim();

        //validation
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
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;