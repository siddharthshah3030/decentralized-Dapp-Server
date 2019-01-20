var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    title: String,
    email: String,
    password: String,
    image : String,
    zipcode : String,
    city : String,
    state: String,
    streetaddress : String,
    voted: Boolean,
    votedTo: String,

    region: String,
    identity: String,
    id: String

})

 voter = mongoose.model('voter', schema);


