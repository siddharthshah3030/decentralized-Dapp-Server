pragma solidity >=0.4.22 <0.6.0;
// Solidity Version 0.4.22 <0.6.0

//   0xbc848c44a72D878aA935CccFe3e307c4e2DB0146 head
//   0x3184b6541c82fAa56B9d2360E2953d89f1Db8d82 Chairperson
// Election contract
contract Elections{

    ///////////////////////////////////////////////////////////////////////////////////////

    // Party Struct
    struct Party{
        uint id;
        bool exists;
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    // Global variables
    address superChairPerson;
    address[] chairpersons;

    address[] campaigns;

    uint[] partyIDs;
    mapping(uint => Party) parties;

    /////////////////////////////////////////////////////////////////////////////////////////

    // Modifieres
    modifier restricted(){
        require(msg.sender == superChairPerson,"Sender not authorized.");
        _;
    }

    modifier checkParty(uint id){
        require(parties[id].exists,"Party does not exists.");
        _;
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    // Constructor
    constructor(address superChairpersonAddress) public {
        superChairPerson = superChairpersonAddress;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    // SuperChairperson Queries (geter and setter)
    function getSuperChairperson() public view returns(address) {
        return superChairPerson;
    }

    function setSuperChairperson(address superChairPersonNew)public restricted{
        superChairPerson = superChairPersonNew;
    }


    //////////////////////////////////////////////////////////////////////////////////////////////

    // Chairperson Queries (geter and setter)
    function getChairpersons() public view restricted returns(address[] memory) {
        return chairpersons;
    }

    function updateChairPerson(address old,address newAdd)public restricted{
        chairpersons.push(newAdd);
        removeChairperson(old);
    }

    function removeChairperson(address chairpersonAddress)public restricted{
        for (uint j =0;j<chairpersons.length;j++){
            if(chairpersons[j] == chairpersonAddress){
                for (uint i = j; i<chairpersons.length-1; i++){
                    chairpersons[i] = chairpersons[i+1];
                }
                delete chairpersons[chairpersons.length-1];
                chairpersons.length--;
                break;
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    // Party Queries
    function addParty(uint id) public restricted{
        parties[id] = Party(id,true);
        partyIDs.push(id);
    }

    function updateParty(uint id, uint newID)public restricted checkParty(id){
        parties[newID] = parties[id];
        removeParty(id);
    }

    function getParties()public view restricted returns(uint[] memory){
        return (partyIDs);
    }

    function removeParty(uint id) public restricted checkParty(id){
        for (uint j =0;j<partyIDs.length;j++){
            if(partyIDs[j] == id){
                for (uint i = j; i<partyIDs.length-1; i++){
                    partyIDs[i] = partyIDs[i+1];
                }
                delete partyIDs[partyIDs.length-1];
                partyIDs.length--;
                break;
            }
        }
        delete parties[id];
    }

    function getNumOfParties() public view restricted returns(uint) {
        return partyIDs.length;
    }

    function getPartyVotesByCampaign(uint id,address campaignAddr)public view restricted checkParty(id)returns(uint){
        ElectionCampaign campaign = ElectionCampaign(campaignAddr);
        return (campaign.getPartyVotes(id));
    }

    function getPartyVotes(uint id)public restricted view checkParty(id) returns(uint){
        uint votes;
        for(uint i = 0; i<campaigns.length; i++){
            votes += getPartyVotesByCampaign(id, campaigns[i]);
        }
        return votes;
    }

    function getPartyCandidatesByCampaign(uint id,address campaignAddr)public view restricted checkParty(id) returns(uint){
        ElectionCampaign campaign = ElectionCampaign(campaignAddr);
        return (campaign.getPartyCandidate(id));
    }

    function getPartyCandidatesCount(uint id)public view restricted checkParty(id) returns(uint){
        uint count;
        for(uint i = 0; i<campaigns.length; i++){
            if(ElectionCampaign(campaigns[i]).getPartyCandidate(id) != 0)
                count ++;
        }
        return (count);
    }

    function getPartyCandidates(uint id)public view restricted checkParty(id) returns(uint[] memory){
        uint size = getPartyCandidatesCount(id);
        uint[] memory ar = new uint[](size);
        uint count = 0;
        for(uint i = 0;i<campaigns.length;i++){
            if(ElectionCampaign(campaigns[i]).getPartyCandidate(id) != 0){
                ar[count] = ElectionCampaign(campaigns[i]).getPartyCandidate(id);
                count++;
            }
        }
        return ar;
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    // Campaign Queries
    function crateElectionCampaign(address chairperson) public restricted returns(address){
        chairpersons.push(chairperson);
        ElectionCampaign campaign = new ElectionCampaign(chairperson,superChairPerson);
        campaigns.push(address(campaign));
        return (address(campaign));
    }

    function getElectionCampaigns() public restricted view returns(address[] memory){
        return (campaigns);
    }

    function removeElectionCampaigns(address adr) public restricted{
        for (uint j =0;j<campaigns.length;j++){
            if(campaigns[j] == adr){
                for (uint i = j; i<campaigns.length-1; i++){
                    campaigns[i] = campaigns[i+1];
                }
                delete campaigns[campaigns.length-1];
                campaigns.length--;
                break;
            }
        }
    }

}

////////////////////////////////////////////////////////////////////////////////////////

// Election Campaign contract
contract ElectionCampaign{

    ///////////////////////////////////////////////////////////////////////////////////////

    // Candidate Stuct
    struct Candidate{
        uint id;
        uint partyID;
        uint votes;
        bool exist;
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    //Voter Stuct
    struct Voter {
        uint id;
        uint toCandidate;
        bool voted;
        bool exist;
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    // Hashmap Stuct
    struct PartyMapping {
        uint id;
        bool exist;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    // Global variables

    address chairperson;
    address superChairperson;

    uint votersCount;

    uint[] candidateIDs;

    mapping (uint => Candidate)public candidates;
    mapping (uint => Voter)public voters;
    mapping (uint => PartyMapping)public partyCandidates;

    ///////////////////////////////////////////////////////////////////////////////////////////

    // Modifieres
    modifier restricted(){
        require(msg.sender == chairperson || msg.sender == superChairperson,"Sender not authorized.");
        _;
    }

    modifier checkCandidate(uint candidateID){
        require(candidates[candidateID].exist,"Candidate does not exist.");
        _;
    }

    modifier checkVoted(uint id){
        require(voters[id].voted,"Voter does not voted");
        _;
    }

    modifier checkVoterExist(uint id){
        require(voters[id].exist,"Voter exists");
        _;
    }

    modifier checkNotVoterExist(uint id){
        require(voters[id].exist,"Voter exists");
        _;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////

    // Constructor
    constructor(address chairpersonAddress, address superChairpersonAddress) public {
        chairperson = chairpersonAddress;
        superChairperson = superChairpersonAddress;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    // SuperChairperson Queries
    function getSuperChairperson() public view returns(address){
        return superChairperson;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    // Chairperson Queries
    function getChairperson() public view returns(address) {
        return chairperson;
    }

    function setChairperson(address chairpersonNew)public restricted{
        chairperson = chairpersonNew;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////

    // Candidate Queries
    function addCandidate(uint id, uint partyID) public restricted{
        if(!candidates[id].exist){
            candidates[id] = Candidate(id,partyID,0,true);
            candidateIDs.push(id);
            partyCandidates[partyID] = PartyMapping(id,true);
        }
    }

    function updateCandidate(uint id, uint newID) public restricted checkCandidate(id){
        candidates[newID] = candidates[id];
        candidateIDs.push(newID);
        removeCandidate(id);
    }

    function getCandidates() public view restricted returns(uint[] memory){
        return (candidateIDs);
    }

    function removeCandidate(uint id) public restricted checkCandidate(id){
        for (uint j =0;j<candidateIDs.length;j++){
            if(candidateIDs[j] == id){
                for (uint i = j; i<candidateIDs.length-1; i++){
                    candidateIDs[i] = candidateIDs[i+1];
                }
                delete candidateIDs[candidateIDs.length-1];
                candidateIDs.length--;
                break;
            }
            delete candidates[id];
        }
    }

    function getCandidateParty(uint id)public view restricted checkCandidate(id) returns(uint){
        return candidates[id].partyID;
    }

    function updateCandidateParty(uint id,uint partyID)public restricted checkCandidate(id){
        candidates[id].partyID = partyID;
    }

    function getNumOfCandidates() public view restricted returns(uint) {
        return candidateIDs.length;
    }

    function getCandidateVotes(uint id) public view restricted checkCandidate(id) returns(uint){
        return (candidates[id].votes);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    // Party Queries
    function getPartyVotes(uint partyID)public view restricted returns(uint){
        if(partyCandidates[partyID].exist){
            if(candidates[partyCandidates[partyID].id].exist){
                return (candidates[partyCandidates[partyID].id].votes);
            }else return 0;
        }else return 0;
    }

    function getPartyCandidate(uint partyID)public view restricted returns(uint){
        if(partyCandidates[partyID].exist){
            return partyCandidates[partyID].id;
        }else{
            return 0;
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    // Voter Queries
    function getNumOfVoters() public view restricted returns(uint) {
        return votersCount;
    }

    function getVote(uint id)public view checkVoted(id) returns(uint){
        return (voters[id].toCandidate);
    }

    function registerVoter(uint id) public checkNotVoterExist(id){
        voters[id] = Voter(id,0,false,true);
    }

    function unRegisterVoter(uint id) public checkNotVoterExist(id){
        voters[id].exist = false;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Actual Vote Function
    function vote(uint id, uint candidateID) public restricted checkCandidate(candidateID){
        require(!voters[id].voted,"Voter already voted");
        voters[id].voted = true;
        voters[id].toCandidate = candidateID;
        candidates[candidateID].votes++;
        votersCount++;
    }

}