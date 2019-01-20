var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:    String,
    abb : String,
    identity: String
})

 party = mongoose.model('party', schema);


