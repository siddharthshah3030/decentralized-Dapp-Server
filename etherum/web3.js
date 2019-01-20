var Web3 = require('web3');
let web3;
if(typeof window !== 'undefined' && typeof  window.web3 !== 'undefined'){
    web3 = new Web3(window.web3.currentProvider);
}
else {
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/6e628e8f3b044d92a2759634a487e04e'
    );
    web3 = new Web3(provider);
}
module.exports = web3;