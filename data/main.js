var mongoose = require('mongoose');

//Schemas
var locations = require('./schema/location'); 
var voters = require('./schema/voter'); 
var party = require('./schema/party'); 


// @Shritesh your calls will be all here 
// uncommment when needed
var a1 = require('./seedBlockchain/partyBlockchain'); 
var a2 = require('./seedBlockchain/campaignBlockchain'); 


// seed only when needed 
//Seeding
// var candies = require('./seedCandidate');
//  var voterLog = require('./seedVoter');
//  var partylog = require('./seedParty');

// voter.find({ function (err, docs) { 

//     console.log(docs)
// }})




