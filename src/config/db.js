require('dotenv').config();
const mongoose = require('mongoose');

const { MONGO_URL } = process.env;

const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Database connected...');
    } catch (error) {
        console.log(error);
    }
}

connectToDB();