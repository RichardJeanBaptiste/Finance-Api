const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
    name: {
        type: String,
        required: 'Name required'
    },
    quote: {
        type: String,
        required: 'Quote required'
    }
})

const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;