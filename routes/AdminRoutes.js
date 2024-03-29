const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const loginSchema = require('../Schemas/login.schema');
const sessionSchema = require('../Schemas/session.schema');
const mongoose = require('mongoose');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt =  require('bcryptjs');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGOURI = process.env.MONGO_URI;
const path = require('path');



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
                

                if(err) return err;
                console.log(result);
                if(result == false){
                    //console.log('fail')
                    return done(null, false, { message: 'Incorrect password.' });
                }else if(result == true){
                    //.log('Success')
                    return done(null, user);
                }
            })
            
        } catch (error) {
            console.log("bcError: - " + error)
        }
    });
}));


// go to admin homepage
router.post('/checklogin', function(req, res){

    const conn = mongoose.createConnection(MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
    const SessionModel = conn.model('sessions', sessionSchema);


    SessionModel.find({ 'session.passport.user.username': req.body.username} , function(err, result){
        
        if(err) console.log(err);
    

        if(result[0] == undefined){
            res.send(false)
        }else{
            res.send(true)
        }
    })
    
});


router.post('/login', passport.authenticate('local', {failureRedirect: 'https://richardjeanbaptiste.github.io/Api-Manager-Dashboard/#/login/fail'}),function(req, res){
    try {
        
        req.session.save(function(err) {
            if(err) console.log(err);
            // session saved
            //console.log(req.session.user);
        })
        
        res.setHeader("Content-Security-Policy", "script-src 'self' https://fonts.gstatic.com/s/mulish/v12/1Ptyg83HX_SGhgqO0yLcmjzUAuWexRNR8aqvG4w-.woff2");
        res.setHeader("Content-Security-Policy", "script-src 'self'  https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js");


        res.sendFile(path.join(__dirname + '/../views/admin.html'));
        //res.redirect(`https://richardjeanbaptiste.github.io/Api-Manager-Dashboard/#/admin/home/${req.user._doc.username}/${uuidv4()}`);
    } catch (error) {
        console.log(error)
        res.send("Sorry couldn't get the homepage")
    }
});




module.exports = router;