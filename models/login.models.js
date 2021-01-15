const mongoose = require('mongoose');
const crypto = require('crypto-js');
const bcrypt = require('bcryptjs');

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

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username required'
    },
    password: {
        type: String,
        required: 'Password required'
    },
    admin: Boolean
})



const Login = mongoose.model('Login', loginSchema);
const Admin = mongoose.model('Admin', adminSchema);

module.exports = {Login, Admin};