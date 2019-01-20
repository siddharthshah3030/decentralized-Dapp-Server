var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://sid:sid3030@ds155864.mlab.com:55864/votingapp';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Schemas
var locations = require('./schema/location'); 
var voters = require('./schema/voter'); 
var party = require('./schema/party'); 


// @Shritesh your calls will be all here 
// uncommment when needed
// var a1 = require('./partyBlockchain');
// var a2 = require('./campaignBlockchain');


console.log("from main.js")
// seed only when needed 
//Seeding
// var candies = require('./seedCandidate');
//  var voterLog = require('./seedVoter');
//  var partylog = require('./seedParty');

// voter.find({ function (err, docs) { 

//     console.log(docs)
// }})




