const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const Quote = require('./models/qoute.models');
const {Login, Admin} = require('./models/login.models');
const jwt = require('jsonwebtoken');
const bcrypt =  require('bcryptjs');
const app = express();
const config = require('./config');
const mongoDB = require('./mongodb');
const PORT = process.env.PORT || 3000;
const quoteRoute = require('./routes/quoteRoutes')

app.use(helmet());
app.use(cors());
app.use('/quotes', quoteRoute);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

try {
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true}).catch((err)=> {
        console.log(err)
    });
} catch (error) {
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

app.get('/', async function(req,res){
    res.sendFile(__dirname + "./views/index.html")
})


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})