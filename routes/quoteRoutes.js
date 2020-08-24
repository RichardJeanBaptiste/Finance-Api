const express = require('express')
const router = express.Router()
const Quote = require('../models/qoute.models')


//get all qoutes from specific author
router.get('/:author', async function(req,res){
    try {

        let quotes = await Quote.find({name: req.params.author}).then((data)=>{
            return data
        })

        res.send(quotes)
    } catch (error) {
        res.send(error)
    }  
})

// get X amount of quotes from author
router.get('/:author/limit=:limit', async function(req,res){
    try {

        let limit = req.params.limit;

        let quotes = await Quote.find({name: req.params.author}).then((data)=>{
            let quoteArr = [];

            for(i = 0; i < limit; i++){
                quoteArr.push(data[i]);
            }

            return quoteArr
        })

        res.send(quotes)
        
    } catch (error) {
        res.send(error)
    }
})

// get random quote from specific author
router.get('/:author/rand', async function(req,res){
    try {
        let author = req.params.author;
        const count = await Quote.countDocuments({name: author}).then((data)=>{
            let rand = Math.floor(Math.random() * data);
            return rand
        });

        const qouteArray = await Quote.find({name: author}).then((data)=> {
            return data
        })

        res.send(qouteArray[count]);
    } catch (error) {
        res.send(error);
    }
})

// get random quote
router.get('/random/qr', async function(req,res){
    try {
        
        const allQuotes = await Quote.find({}).then((data)=>{
            return data
        })

        const count = await Quote.countDocuments({}).then((data)=>{
            let rand = Math.floor(Math.random() * data);
            return rand
        });

        res.send(allQuotes[count])
        
    } catch (error) {
        
    }
})


module.exports = router;