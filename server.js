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
//const mongoDB = require('./mongodb');
const PORT = process.env.PORT || 3000;
const quoteRoute = require('./routes/quoteRoutes');
const create = require('./create');


app.use(helmet());
app.use(cors());
app.use('/quotes', quoteRoute);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

try {
    mongoose.connect('mongodb+srv://Richinbk:VZUbwFmW3d4EUSjw@finance-api.jvol5.mongodb.net/Finance-Quotes?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true}).catch((err)=> {
        console.log(err)
    });
} catch (error) {
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

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

app.post('/addquotes', async function(req,res){
    try {

        let author = req.body.author;
        let count = Object.keys(req.body).length;

        if(count === 1){
            res.send("Empty Params");
        }else{

            for(let key in req.body){
                if(req.body[key] != author){
                    //console.log(req.body[key]);
                    create(author,req.body[key]);
                }
            }
    
            res.send("Quotes Added");
        }
        
    } catch (error) {
        
        res.send(error);
    }
    
});


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})