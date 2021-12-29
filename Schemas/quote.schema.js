const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name required'
    },
    quote: {
        type: String,
        required: 'Quote required'
    }
})

module.exports = { quoteSchema }; 