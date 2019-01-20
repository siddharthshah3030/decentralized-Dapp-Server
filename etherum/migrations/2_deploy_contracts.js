var Elections = artifacts.require('./Elections.sol');
module.exports = function(deployer, network, accounts) {
    deployer.deploy(Elections, accounts[0]);
};
