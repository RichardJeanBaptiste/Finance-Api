const express = require('express')
const router = express.Router()

//get all qoutes from specific author
router.get('/quote/:author', function(req,res){
    res.send(req)
})

