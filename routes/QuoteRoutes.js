const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Quote = require('../models/qoute.models');
const quoteSchema = require('../Schemas/quote.schema');
const MONGOURI = process.env.MONGO_URI;


// get all quotes
router.get('/all', async function(req,res){

    const conn = mongoose.createConnection(MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
    const QuoteModel = conn.model('Quote', quoteSchema);


    QuoteModel.find({}, (err, docs) => {
        
        if (err) res.send('Something broke on our end sorry!')
        res.json(docs)
    })

})


//get all qoutes from specific author
router.get('/:author', async function(req,res){

    const conn = mongoose.createConnection(MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
    const QuoteModel = conn.model('Quote', quoteSchema);
    
    QuoteModel.find({name: req.params.author}, (err, docs) => {
        if (err) res.send('Something broke on our end sorry!')
        res.json(docs)
    })

})

// get X amount of quotes from author
router.get('/:author/limit=:limit', async function(req,res){

    const conn = mongoose.createConnection(MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
    const QuoteModel = conn.model('Quote', quoteSchema);

    let limit = req.params.limit;
    let author = req.params.author;

    QuoteModel.find({name: author}, (err, docs) => {
        if (err) res.send('Something broke on our end sorry!')

        let quotelist = [];

        for(let i = 0; i < limit; i++){
            quotelist.push(docs[i]);
        }

        res.json(quotelist);
    })
})

// get random quote
router.get('/all/random', function(req,res) {

    const conn = mongoose.createConnection(MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
    const QuoteModel = conn.model('Quote', quoteSchema);

    QuoteModel.find({}, (err, docs) => {

        if (err) res.send('Something broke on our end sorry!')

        let random = Math.floor(Math.random() * docs.length)

        res.json(docs[random])
    })
})


// get random quote from specific author
router.get('/:author/random', function(req,res){

    const conn = mongoose.createConnection(MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
    const QuoteModel = conn.model('Quote', quoteSchema);

    let author = req.params.author;
    

    QuoteModel.find({name: author}, (err, docs) => {
        if (err) res.send('Something broke on our end sorry!')

        let random = Math.floor(Math.random() * docs.length);

        res.json(docs[random])

    })

})

// get x amount of random quotes
router.get('/all/random/limit=:limit', function(req,res){

    const conn = mongoose.createConnection(MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
    const QuoteModel = conn.model('Quote', quoteSchema);

    let limit = req.params.limit;
    let random;

    QuoteModel.find({}, (err, docs) => {

        if (err) res.send('Something broke on our end sorry!')

        let quotelist = [];

        for(let i = 0; i < limit; i++){
            random = Math.floor(Math.random() * docs.length);
            quotelist.push(docs[random])
        }

        res.json(quotelist)


    })
})




module.exports = router;