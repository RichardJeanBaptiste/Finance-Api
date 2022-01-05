const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const quoteSchema = require('../Schemas/quote.schema');
const MONGOURI = process.env.MONGO_URI;

router.post('/addquotes', async function(req,res){

    const quoteSchema = new mongoose.Schema({
        name: {
            type: String,
        },
        quote: {
            type: String,
        },
        image: {
            type: String,
        },
        bio: {
            desc: {type: String},
            life: {type: String},
            wiki: {type: String},
            networth: {type: String},
            educaation: {type: String},
        }
    })

    const conn = mongoose.createConnection(MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
    const QuoteModel = conn.model('Quote', quoteSchema);

    let quotes = req.body.quotes;

    for(let i = 0; i < req.body.quotes.length; i++){

        let data = {
            name: req.body.name,
            image: req.body.image,
            quote: quotes[i],
            bio: {
                desc: req.body.bio.desc,
                life: req.body.bio.life,
                wiki: req.body.bio.wiki,
                networth: req.body.bio.networth,
                education: req.body.bio.education,
            }
        }
        
        QuoteModel.create(data, function (err, small) {
            if (err) return handleError(err);
            // saved!
            console.log(small)
        });
    }
   
   res.send('Data recieved')
    
});



module.exports = router;


