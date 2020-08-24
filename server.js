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
const PORT = 3000 || process.env.PORT;
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


app.get('/login', async (req,res) => {
    try {
        res.sendFile(path.join(__dirname + '/views/loginform.html'));
    } catch (error) {
        res.send(error)
    }
})

app.post('/admin', async (req,res) => {
    try {
        let pass = req.body.password
        // check email
        let user = await Admin.findOne({ "username": req.body.username })
        if(!user){
            return res.status('401').json({ error: "User Not Found"})
        } 
        // check password
        let userId = await Admin.find({"username": req.body.username},'password' ,function(err, docs){
            
            bcrypt.compare(req.body.password, docs[0].password).then((x) => {
                if(x === true){
                    res.sendFile(__dirname + '/views/AddQuotes.html');
                }else{
                    res.send("We could not find these credentials");
                }
            }).catch((err) => {
                console.log(err);
            });  
        })
        //const token = jwt.sign({_id: user._id}, config.secret);
    } catch (error) {
        res.send(error)
    }
})

// create new quote
app.post("/admin/add", async (req,res) => {
    try {
        let author = req.body.Author;
        let quote = req.body.Quote;
        quote = quote.trim();
        await Quote.create({name: author, quote: quote}).then((data)=>{
            console.log(data)
        });
        res.send("added quotes")
    } catch (error) {
        console.log(error);
    }
})

// edit quote
// delete quote


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})