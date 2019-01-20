var Web3 = require('web3');
var ethers = require('ethers');
const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/6e628e8f3b044d92a2759634a487e04e'
);
web3 = new Web3(provider);
module.exports = web3;