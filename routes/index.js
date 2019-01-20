var express = require('express');
var router = express.Router();
var Elections = require('../etherum/elections');
var web3 = require('../etherum/web3');
/* GET home page. */
router.get('/', function(req, res, next) {
  Elections.deployed().then(function(instance) {
    var electionInstance = instance;
    const accounts = web3.eth.getAccounts();//todo: promise
    return electionInstance.getSuperChairperson.call();
  }).then(function(response) {
    console.log(response);
  }).catch(function(err) {
    console.log(err.message);
  });
  console.log(res.render('index', { title: 'Express' }));
  res.render('index', { title: 'Express' });
});


router.post('/start',function(req,res){
  var tempBody = {
      userid : "5c4244d5b1a3cc0e3c904cec"

  }

  // var user_name=req.body.user;
   user_name=req.tempBody.userid;
   voter.findById(userid, function (err, voter) {
    campaign.findOne({ name: voter.region }, function (err, location) {
        var str = "";
        var int = 1;
        location.candidates.map(e=>{

            // console.log(e.party.abb)
            str = str + int+"-"
            str = str + e.party.abb
            str = str + " "

            int++;
        })
    console.log(str )

    res.send(str);
});
    // console.log(voter.region)
    // console.log("iuchniu")
});
  // var password=req.body.password;
  console.log("User name = "+user_name+", password is ");

  // console.log("User name = "+user_name+", password is "+password);
  // res.end("yes");
});

module.exports = router;

