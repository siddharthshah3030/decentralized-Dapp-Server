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

module.exports = router;

