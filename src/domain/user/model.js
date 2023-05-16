const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now },
    admin: { type: Boolean, default: false },
    token: String,
})

const User = mongoose.model('User', UserSchema);

module.exports = User;