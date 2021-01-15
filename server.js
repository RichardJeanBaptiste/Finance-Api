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
//const config = require('./config');
const mongoDB = require('./mongodb');
const PORT = process.env.PORT || 3000;
const quoteRoute = require('./routes/quoteRoutes');
const create = require('./create');

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

//create("John Kenneth Galbraith");


//main view 
app.get('/', async function(req,res){
    res.sendFile(__dirname + "/views/index.html")
})

app.get('/login', async function(req,res){
    res.sendFile(__dirname + "/views/login.html")
});

app.post('/admin', async function(req,res){
    let username = req.body.username;
    let password = req.body.password;

    Admin.find({username: username, password: password}).then((data)=> {
        if(data.length == 0 || data === undefined){
            res.send("User Not Found")
        }else{
            res.sendFile(__dirname + "/views/admin.html")
        }
    });
});


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})