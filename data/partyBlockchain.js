console.log("from block chain party")
var Elections = require("../etherum/elections");
var web3 = require('../etherum/web3');

party.find({}, function(err, currentParty) {
    console.log("from party find for block chain")
    currentParty.forEach(function(partyInstance) {
        Elections.deployed().then(function(instance) {
            var electionInstance = instance;
            return web3.eth.getAccounts()
                .then(function (accounts) {
                    return electionInstance
                        .addParty(currentParty.identity)
                        .send({
                           from: accounts[0]
                        });
            });
        })
        console.log(partyInstance)

    });
});
