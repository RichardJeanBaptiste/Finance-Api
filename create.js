const Quote = require("./models/qoute.models");


/**
 * 
 * Quote.create({name: "abc", quote:"def"}, function(err,small){
    if (err) console.log(err);
    });
 */

const create = (auth) => {
    let temp;

    let arr = [
        "The modern conservative is engaged in one of man's oldest exercises in moral philosophy; that is, the search for a superior moral justification for selfishness.",
        "The only function of economic forecasting is to make astrology look respectable.",
        "Faced with the choice between changing one's mind and proving that there is no need to do so, almost everyone gets busy on the proof.",
        "Economics is extremely useful as a form of employment for economists.",
        "The process by which banks create money is so simple that the mind is repelled.",
        "We all agree that pessimism is a mark of superior intellect.",
        "Wealth, in even the most improbable cases, manages to convey the aspect of intelligence.",
        "Humor is richly rewarding to the person who employs it. It has some value in gaining and holding attention, but it has no persuasive value at all.",
        "Economics is extremely useful as a form of employment for economists.",
        "In economics, hope and faith coexist with great scientific pretension and also a deep desire for respectability.",
        "The conspicuously wealthy turn up urging the character building values of the privation of the poor.",
        "The great dialectic in our time is not, as anciently and by some still supposed, between capital and labor; it is between economic enterprise and the state.",
        "Of all classes the rich are the most noticed and the least studied.",
        "Money differs from an automobile or mistress in being equally important to those who have it and those who do not.",
        "One of the greatest pieces of economic wisdom is to know what you do not know.",
        "Wealth is not without its advantages and the case to the contrary, although it has often been made, has never proved widely persuasive.",
        "Economics is a subject profoundly conducive to cliche, resonant with boredom. On few topics is an American audience so practiced in turning off its ears and minds. And none can say that the response is ill advised.",
    ];

    for (let x in arr){
        temp = new Quote({name: auth, quote: arr[x]});
        temp.save(function (err){
            if (err) console.log(err);
        });
    }
    console.log("Quotes added");
}

module.exports = create;