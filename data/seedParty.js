
var faker = require('faker')

var mongoose = require('mongoose');
var db = require('./schema/party');

var abbParties = ['BJP','AITC','BSP','CPI','INC', 'NCP','AAP','NPP','SS','SP'];
var parties = [
    'Bharatiya Janata Party',
    'All India Trinamool Congress',
    'Bahujan Samaj Party',
    'Communist Party of India',
    'Indian National Congress',
    'Nationalist Congress Party',
    'Aam Aadmi Party',
    "National People's Party",
    'Shiv Sena',
    'Samajwadi Party'
]
var symbol = [
    'stringUrl',
    'stringUrl',
    'stringUrl',
    'stringUrl',
    'stringUrl',
    'stringUrl',
    'stringUrl',
    'stringUrl',
    'stringUrl',
    'stringUrl',
    'stringUrl',
]


// faker.locale = "en_IND";

function makeid() {
  var text = "";
  var possible = "0123456789";

  for (var i = 0; i < 40; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
  console.log(makeid());

for(var i=0;i<10;i++){
    // var cnt = i%100;
    // if(i==0){ cntx = 100;}
    // faker.seed(i);
    var newparty = new party( {  
         name : parties[i],
         abb : abbParties[i],

         identity : i+100
})

        console.log(party)
        newparty.save(function (err) {
      if (err) return handleError(err);
      // saved!
      console.log("error in seeding party")
    });
}


