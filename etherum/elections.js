var Web3 = require('web3');
var ElectionData = require('./build/contracts/Elections.json');
const ethers = require('ethers');
const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/6e628e8f3b044d92a2759634a487e04e'
);
let web3Provider = new ethers.providers.Web3Provider(provider);
let contractAddress = "0x2BCac02bAAEC39522ad7eC2fD1921854cE194134";
var Elections =  new ethers.Contract(contractAddress, ElectionData['abi'], web3Provider);
module.exports = Elections;
