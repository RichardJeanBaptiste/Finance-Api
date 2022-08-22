const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/privacy', async function(req, res){
    res.sendFile(path.join(__dirname + '/../views/privacypolicy.html'));
})

router.get('/terms', async function(req, res){
    res.sendFile(path.join(__dirname + '/../views/terms.html'));
})


module.exports = router;