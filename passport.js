const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt =  require('bcryptjs');
const loginSchema = require('./Schemas/login.schema');
const saltRounds = 10;



const CheckUserLogin = passport.use(new LocalStrategy(function(username, password, done) {

    const conn = mongoose.createConnection('mongodb+srv://Richinbk:VZUbwFmW3d4EUSjw@finance-api.jvol5.mongodb.net/Finance-Quotes?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
    const LoginModel = conn.model('Login', loginSchema);

    // find user
    LoginModel.findOne({ username: username }, function(err, user) {
        if (err)  return done(err); 
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        
        // compare passwords 
        bcrypt.compare(password, user[0].password, function(err, result){
            if(err) return done(err)
            if(!result) return done(null, false, {message: 'Incorrect password.'})
            return done(null, user);
        })
        /*
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        */
        return done(null, user);
    });

}));


module.exports = { CheckUserLogin };
