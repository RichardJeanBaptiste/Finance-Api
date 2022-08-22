const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/privacy', async function(req, res){
    res.sendFile(path.join(__dirname + '/../views/privacypolicy.html'));
})

router.get('/terms', async function(req, res){
    res.sendFile(path.join(__dirname + '/../views/terms.html'));
    //res.redirect('https://www.termsfeed.com/live/a64b54c9-eb12-4f09-8d50-67c9cf78a4c0')
})


module.exports = router;