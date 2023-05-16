const User = require('./model');
const hashData = require('../../util/hashData');

const createUser = async (data) => {
    try {
        const { name, email, password } = data;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw Error('User with provided email alredy exists.');
        }

        const hashedPassword = await hashData(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })

        const createdUser = await newUser.save();
        return createdUser;
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser };