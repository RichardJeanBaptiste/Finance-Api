const express = require('express');
const router = express.Router();
const loginSchema = require('../Schemas/login.schema');
const mongoose = require('mongoose');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt =  require('bcryptjs');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGOURI = process.env.MONGO_URI || "mongodb+srv://Richinbk:VZUbwFmW3d4EUSjw@finance-api.jvol5.mongodb.net/Finance-Quotes?retryWrites=true&w=majority";



passport.use(new LocalStrategy( async function(username, password, done) {

    const conn = mongoose.createConnection(MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
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
                    //console.log('Success')
                }
            })
            
        } catch (error) {
            console.log("bcError: - " + error)
        }
       
        return done(null, user);
    });

}));


// go to admin homepage


router.get('/failLogin', async function(req,res){
    res.send('failed to login')
    //res.redirect('http://localhost:3000/login');
})


router.post('/login', passport.authenticate('local', {
        failureRedirect: 'http://localhost:3000/login/fail',
    }),function(req, res){
    try {
        //console.log(req.user._doc.username);

        req.session.user = {
            uuid: req.user._doc.userId,
        }

        req.session.save(function(err) {
            // session saved
            console.log(req.session.user);
        })
        
        res.redirect('http://localhost:3000/admin/home');
    } catch (error) {
        console.log(error)
        res.send("Sorry couldn't get the homepage")
    }
});

module.exports = router;