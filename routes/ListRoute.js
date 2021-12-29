const express = require('express')
const router = express.Router()
const quoteSchema = require('../Schemas/quote.schema');
const mongoose = require('mongoose');
const Quote = require('../models/qoute.models');
//const Quote = require('../models/qoute.models')

const MONGOURI = process.env.MONGO_URI || "mongodb+srv://Richinbk:VZUbwFmW3d4EUSjw@finance-api.jvol5.mongodb.net/Finance-Quotes?retryWrites=true&w=majority";

router.get('/rand/limit=:limit', async (req,res) => {

    const conn = mongoose.createConnection(MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
    const QuoteModel = conn.model('Quote', quoteSchema);


    try {
        let quoteArr = [];
        let limit = req.params.limit;
        

        for (let i = 0; i < limit; i++){
            let random = Math.floor(Math.random() * 823);

            const randomQuote = await QuoteModel.findOne({}, null, {skip: random}).then((data)=>{
                //console.log(data)
                return data
            })
    
            quoteArr.push(randomQuote);
        } 

        res.send(quoteArr);
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;