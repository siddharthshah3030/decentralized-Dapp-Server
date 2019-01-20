var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:    String,
    identity: String
})

 chairP = mongoose.model('chairP', schema);


