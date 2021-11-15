const sessionSchema = require('./Schemas/session.schema');
const mongoose = require('mongoose');


const conn = mongoose.createConnection("mongodb+srv://Richinbk:VZUbwFmW3d4EUSjw@finance-api.jvol5.mongodb.net/Finance-Quotes?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true, poolSize:1});
const SessionModel = conn.model('sessions', sessionSchema);


/*
SessionModel.find({}, function(err, result){
    //let x = {...result[0]};
    console.log(result[0]._doc.session.passport.user.username);
    //console.log(x)
    //console.log(x._doc.session.passport.user.username);
})
*/


SessionModel.find({ 'session.passport.user.username': 'dnvldmr'} , function(err, result){
    if(err) console.log(err);

    //console.log(result[])
    console.log(result[0]._doc.session.passport.user.username);
})

