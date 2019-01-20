var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:    String,
    locationName : String,
    chairPName : String,
    ChairPAdd: String,

    candidates : [ {name : String,candidateId : String, party : { name : String ,abb: String, symbol : String, partyId : String}} ]
})

 campaign = mongoose.model('campaign', schema);


