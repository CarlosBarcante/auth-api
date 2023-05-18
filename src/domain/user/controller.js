const User = require('./model');
const { hashData, verifyData } = require('../../util/hashData');
const createToken = require('../../util/createToken');

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

const authUser = async (data) => {
    try {
        const { email, password } = data;

        const fetchedUser = await User.findOne({ email });
        if (!fetchedUser) {
            throw Error('Invalid credentials entered!');
        }

        const hashedPassword = fetchedUser.password;
        const passwordMatch = await verifyData(password, hashedPassword);
        if (!passwordMatch) {
            throw Error('Invalid credentials entered!');
        }

        const tokenData = { userId: fetchedUser._id, email, admin: fetchedUser.admin };
        const token = await createToken(tokenData);

        fetchedUser.token = token;
        return fetchedUser;
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser, authUser };