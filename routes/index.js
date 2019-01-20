var express = require('express');
var router = express.Router();
var Elections = require('../etherum/elections');
var web3 = require('../etherum/web3');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

