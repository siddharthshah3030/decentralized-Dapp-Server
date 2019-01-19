var Web3 = require('web3');
var HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider('toss strong carpet cloth twin nominee cave skull fog gap enroll toy','https://rinkeby.infura.io/v3/6e628e8f3b044d92a2759634a487e04e');
const web3 = new Web3(provider);
module.exports = web3;