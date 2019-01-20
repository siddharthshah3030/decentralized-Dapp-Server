var Elections = artifacts.require('./Elections.sol');
contract('Elections', function(accounts) {
  it("SuperChairPerson", function(done) {
    Elections.deployed().then(function(instance){
      console.log(instance.getSuperChairperson);
      return instance.getSuperChairperson.call().then(function (response){
        assert.isTrue(response === accounts[0]);
        done();
      });
    });
  });
});
