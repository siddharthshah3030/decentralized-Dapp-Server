console.log("from block chain party")

party.find({}, function(err, currentParty) {
    console.log("from party find for block chain")
    currentParty.forEach(function(partyInstance) {
        // @shritesh do you function here
        console.log(partyInstance)

    });
}
)
