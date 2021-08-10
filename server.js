//require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const Quote = require('./models/qoute.models');
const {Login, Admin} = require('./models/login.models');
const loginSchema = require('./Schemas/login.schema');
const bcrypt =  require('bcryptjs');
const app = express();
const PORT = process.env.PORT || 3000;
const quoteRoute = require('./routes/quoteRoutes');
const create = require('./create');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const timeout = require('connect-timeout');
const morgan = require('morgan');
const saltRounds = 10;



app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use('/quotes', quoteRoute);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(session({ 
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true , maxAge: 60000 }
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

try {
    console.log(process.env.MONGO_URI);
    console.log(process.env.TEST);
} catch (error) {
    console.log(error)
}

// connect to database
try {
    mongoose.connect('mongodb+srv://Richinbk:VZUbwFmW3d4EUSjw@finance-api.jvol5.mongodb.net/Finance-Quotes?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true}).catch((err)=> {
        console.log(err)
    });
} catch (error) {
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

const store = new MongoDBStore({
    uri: 'mongodb+srv://Richinbk:VZUbwFmW3d4EUSjw@finance-api.jvol5.mongodb.net/Finance-Quotes?retryWrites=true&w=majority',
    collection: 'mySessions'
});




passport.use(new LocalStrategy( async function(username, password, done) {

    const conn = mongoose.createConnection('mongodb+srv://Richinbk:VZUbwFmW3d4EUSjw@finance-api.jvol5.mongodb.net/Finance-Quotes?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
    const AdminModel = conn.model('Admin', loginSchema);

    AdminModel.findOne({ username: username }, async function(err, user) {

        let UserData = JSON.parse(JSON.stringify(user));
       
        if (err)  return done(err);

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        try {
            bcrypt.compare(password,UserData.password,function(err,result){
                //if(err) return err;
                //console.log(result);
                if(result === false){
                    return done(null, false, { message: 'Incorrect password.' });
                }else if(result === true){
                    console.log('Success')
                }
            })
            
        } catch (error) {
            console.log("bcError: - " + error)
        }
       
        return done(null, user);
    });

}));

//main view 
app.get('/', async function(req,res){
    res.sendFile(__dirname + "/views/index.html")
})

app.get('/login', async function(req,res){
    res.sendFile(__dirname + "/views/login.html")
});

app.post('/login', timeout('29s') ,passport.authenticate('local', { failureRedirect: '/login'}), function(req,res){
    res.sendFile(__dirname + "/views/admin.html")
})



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


// Catch route errors
function errorHandler(err, req, res, next){
    console.log(err)
    res.send('Something Broke - Wait a minute and try reloading the page')
}

// Catch Store Errors
store.on('error', function(error) {
    console.log(error);
  });



app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})