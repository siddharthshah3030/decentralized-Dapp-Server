console.log("from block chain party")
var Elections = require("../etherum/elections");
var web3 = require('../etherum/web3');

party.find({}, function(err, currentParty) {
    console.log("from party find for block chain")
    currentParty.forEach(function(partyInstance) {
        Elections.deployed().then(function(instance) {
            var electionInstance = instance;
            web3.eth.getAccounts
                .then(function (accounts) {
                    console.log(accounts);
                    return electionInstance
                        .addParty(parseInt(partyInstance['identity']),{
                            from: accounts[0]
                        }).then(function (res) {
                            console.log(res)
                        }).catch(function (err) {
                            console.log(err);
                        });
            });
        });
        console.log(partyInstance)

    });
});
