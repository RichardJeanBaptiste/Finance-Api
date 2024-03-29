/**
 * error-handling
 * api-keys
 * rate-limiting
 * 
 */


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
const PolicyRoutes = require('./routes/PolicyRoutes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport')
const morgan = require('morgan');
const MONGOURI = process.env.MONGO_URI;



//// connect to database
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
//app.use(express.static(path.join(__dirname, 'client/build')));
app.use("/public", express.static(__dirname + "/public"));
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
        scriptSrc: [" 'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js", ],
        styleSrc: ["'self'", 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css'],
    }
}))
app.use(morgan('combined'));
app.use(cors());


// Routes
app.use('/admin', AdminRoutes);
app.use('/quotes', quoteRoute);
app.use('/edit', EditRoutes);
app.use('/policies', PolicyRoutes);


/*
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
*/

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname + '/views/login.html'));
})


function errorHandler(err, req, res, next){
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
}



app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})

