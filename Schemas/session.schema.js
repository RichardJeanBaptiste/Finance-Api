const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    _id: {
        type: 'string'
    },
})

module.exports = { sessionSchema };