require('dotenv').config();
const mongoose = require('mongoose');

const { MONG0_URL } = process.env;

const connectToDB = async () => {
    try {
        await mongoose.connect(MONG0_URL);
        console.log('Database connected...');
    } catch (error) {
        console.log(error);
    }
}

connectToDB();