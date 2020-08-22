const express = require('express')
const router = express.Router()
const Quote = require('../models/qoute.models')

//get all qoutes from specific author
router.get('/:author', function(req,res){
    try {
        Quote.find({name: req.params.author}).then((data)=>{
            res.send(data)
        })
    } catch (error) {
        res.send(error)
    }  
})

// get random quote from specific author
// get random quote
// get specific quote

module.exports = router;