const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username required'
    },
    password: {
        type: String,
        required: 'Password required'
    },
})

module.exports = { loginSchema }; 