require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const quoteRoute = require('./routes/QuoteRoutes');
const AdminRoutes = require('./routes/AdminRoutes');
const EditRoutes = require('./routes/EditRoutes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport')
const morgan = require('morgan');
const MONGOURI = process.env.MONGO_URI;


// connect to database
try {
    mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true}).catch((err)=> {
        console.log(err)
    });
} catch (error) {
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

const store = new MongoDBStore({
    uri: MONGOURI,
    collection: 'sessions'
});

// Catch Store Errors
store.on('error', function(error) {
    //console.log('Store Error')
    console.log(error);
});

//Passport Middleware
passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Express Middleware
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
    secret: process.env.SECRET_KEY || 'secret cat',
    resave: true,
    saveUninitialized: false,
    cookie: 
        { 
            secure: true, 
            maxAge: 3600000,  
        },
    store: store,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler)
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'"],
        scriptSrc: [" 'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"],
        styleSrc: ["'self'", 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css'],
    }
}))
app.use(morgan('combined'));
app.use(cors());


// Routes
app.use('/admin', AdminRoutes);
app.use('/quotes', quoteRoute);
app.use('/edit', EditRoutes);



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});



function errorHandler(err, req, res, next){
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
}


/*

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



function haltOnTimedout (req, res, next) {
    if(!req.timedout) next()
}
*/


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})
