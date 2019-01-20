var Migrations = artifacts.require("./Migrations.sol");
var Elections = artifacts.require('./Elections.sol');
module.exports = function(deployer, network, accounts) {
  deployer.deploy(Migrations);
  deployer.deploy(Elections, accounts[0]);
};
