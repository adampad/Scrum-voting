// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    // declarations
    address public owner;
    uint public scrumVotingId;
    enum Proposals { Elon, Mark, Sam }

    struct Proposal {
        Proposals proposal;
        uint voteCount;
    }

    struct Voter {
        bool registered;
        uint remainingVotes;
    }

    struct History {
        uint votingId;
        Proposals proposal;
        uint maxVoteCount;
    }

    mapping(address => Voter) public voters;
    Proposal[3] public proposals;
    History[] public historyOfProposals;

    // declare events
    event VoterRegisteredEvent(address voterAddress);
    event VoteProposalEvent(address indexed voter, Proposals proposal);
    event DeclareWinnerEvent(uint indexed voteId, Proposals proposal, uint maxVoteCount);
    event ChangeOwnerEvent(address indexed oldOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerVoter(address _voterAddress) public {
        // Ensure the voter is not already registered
        require(!voters[_voterAddress].registered, "Voter is already registered!");

        // register the voter
        voters[_voterAddress] = Voter({
            registered: true,
            remainingVotes: 5
        });

        emit VoterRegisteredEvent(_voterAddress);
    }

    function voteProposal(Proposals votedProposal) public payable {
        // Ensure the voter is registered
        require(voters[msg.sender].registered, "Voter is not registered.");
        
        // Ensure that the voter has remaining votes
        require(voters[msg.sender].remainingVotes > 0, "No remaining votes");
        
        // Ensure the voter has sent 0.01 ether
        require(msg.value == 0.01 ether, "Must send 0.01 ether to vote");

        // decrease the voter's remaining votes
        voters[msg.sender].remainingVotes--;

        // increase the vote count for the chosen proposal
        if (votedProposal == Proposals.Elon)  proposals[0].voteCount++;
        if (votedProposal == Proposals.Mark)  proposals[1].voteCount++;
        if (votedProposal == Proposals.Sam)   proposals[2].voteCount++;

        emit VoteProposalEvent(msg.sender, votedProposal);
    }

    function declareWinner() public onlyOwner returns (Proposals){
        uint maxVoteCount = 0;
        // Default the first proposal
        Proposals winningProposal = Proposals.Elon;
        bool hasTie = false;

        for (uint index = 0; index < proposals.length; index++) {
            if (proposals[index].voteCount > maxVoteCount) {
                maxVoteCount = proposals[index].voteCount;
                winningProposal = proposals[index].proposal;
                if (hasTie) hasTie = false;
            } else if (proposals[index].voteCount == maxVoteCount) {
                hasTie = true;
            }
        }

        if (hasTie) {
            uint[] memory tiedProposals = new uint[](proposals.length);
            uint tiedCount = 0;

            for (uint index = 0; index < proposals.length; index++) {
                if (proposals[index].voteCount == maxVoteCount) {
                    tiedProposals[tiedCount++] = index;
                }
            }

            // Randomly select one of the tied proposals
            uint randomIndex = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % tiedCount;
            winningProposal = proposals[tiedProposals[randomIndex]].proposal;
        }

        emit DeclareWinnerEvent(scrumVotingId, winningProposal, maxVoteCount);
        // after the scrum voting process is done add the voting into history
        addHistory(scrumVotingId, winningProposal, maxVoteCount);

        return winningProposal;
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function reset() public onlyOwner {
        // set back to default state the proposals mapping
        for (uint index = 0; index < proposals.length; index++) {
            proposals[index].voteCount = 0;
        }
    }

    function destroy() public onlyOwner {
        selfdestruct(payable(owner));
    }

    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
        emit ChangeOwnerEvent(owner, newOwner);
    }

    function addHistory(uint votingId, Proposals proposal, uint maxVoteCount) public {
        historyOfProposals.push(History(votingId, proposal, maxVoteCount));
    }

    function getTenMostRecentHistoryEntries() public view returns (History[] memory) {
        uint historyLength = historyOfProposals.length;
        uint start = historyLength >= 10 ? historyLength - 10 : 0;
        uint count = historyLength >= 10 ? 10 : historyLength;

        History[] memory last10Entries = new History[](count);
        for (uint i = 0; i < count; i++) {
            last10Entries[i] = historyOfProposals[start + i];
        }
        return last10Entries;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
