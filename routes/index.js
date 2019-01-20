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


  var user_name=req.body.ui;
  console.log(user_name)
  //  user_name=req.tempBody.userid;
   voter.findById(user_name, function (err, voter) {
    campaign.findOne({ name: voter.region }, function (err, location) {
        var str = "";
        var int = 1;
        location.candidates.map(e=>{

            console.log(e.party.abb)
            str = str + int+"-"
            str = str + e.party.abb
            str = str + " "

            int++;
        })
    console.log(str )
        // str = "correct stringyes"
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



router.post('/vote',function(req,res){
  // var tempBody = {
  //     userid : "5c4244d5b1a3cc0e3c904cec"
  // }
  // console.log(req.body);
  var button = req.body.button;
  button = 3;
  voter.findById(userid, function (err, voter) {
      var voterId = voter.identity
      campaign.findOne({ name: voter.region }, function (err, location) {
          var str = "hell yeah ";
          var int = 1;
          console.log(location.candidates[button].candidateId)
          var candidateId = location.candidates[button].candidateId;
      console.log(str )

      // res.send("inside post");
  });
      // console.log(voter.region)
      // console.log("iuchniu")
  });// str = JSON.stringify(req.body, null, 4); // (Optional) beautiful indented output.
// console.log("in post of button ")
// console.log(str); // Logs output to dev tools console.
  // var user_name=req.body.user;
  //  user_name=req.tempBody.userid;
  // var password=req.body.password;
  // console.log("User name = "+user_name+", password is ");
  // session = 1;
  // setTimeout(function() {
  //     session = 0;

  //     console.log("time out function ")
  //     //your code to be executed after 1 second
  //   }, 10000);
  // console.log("User name = "+user_name+", password is "+password);
  res.end("vote submitted successfully, please wait for transaction confirmation");
});




module.exports = router;

