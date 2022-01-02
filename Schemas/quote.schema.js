const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    quote: {
        type: String,
    }
})

module.exports = { quoteSchema }; 