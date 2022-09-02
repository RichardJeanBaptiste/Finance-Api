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
            education: {type: String},
        }
    })

    const conn = mongoose.createConnection(MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
    const QuoteModel = conn.model('Quote', quoteSchema);

    for(let i = 7; i < Object.entries(req.body).length; i++){

        let data = {
            name: req.body.author.toLowerCase(),
            image: req.body.image,
            quote: Object.entries(req.body)[i][1],
            bio: {
                desc: req.body.description,
                life: req.body.life,
                wiki: req.body.wiki,
                networth: req.body.networth,
                education: req.body.education,
            }
        }
        
        QuoteModel.create(data, function (err, small) {
            if (err) {
                console.log(err);
                res.send('An error occured while submitting the data')
            }
            // saved!
            console.log(small)
        });

    }
   
   res.send('Data recieved')
   
});



module.exports = router;


