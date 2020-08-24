const express = require('express')
const router = express.Router()
const Quote = require('../models/qoute.models')
const { count } = require('../models/qoute.models')



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
router.get('/random/r', async function(req,res){
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

// get specific quote

module.exports = router;