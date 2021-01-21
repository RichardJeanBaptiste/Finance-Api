const Quote = require("./models/qoute.models");

/*
const create = (auth, arr) => {
    
    let temp;

    for (let x in arr){
        temp = new Quote({name: auth, quote: arr[x]});
        temp.save(function (err){
            if (err) console.log(err);
        });
    }
    console.log("Quotes added");

}
*/

const create = (auth, quote) => {
    
    let temp;

    temp = new Quote({name: auth, quote: quote});
    temp.save(function (err){
        if (err) console.log(err);
    });
}

module.exports = create;