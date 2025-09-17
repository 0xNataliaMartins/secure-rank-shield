// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecureRankShield is SepoliaConfig {
    using FHE for *;
    
    struct Player {
        euint32 playerId;
        euint32 score;
        euint32 rank;
        euint32 previousRank;
        bool isActive;
        bool isEncrypted;
        string playerName;
        address playerAddress;
        uint256 lastUpdate;
        uint256 cycleId;
    }
    
    struct Cycle {
        euint32 cycleId;
        euint32 totalPlayers;
        euint32 activePlayers;
        bool isActive;
        bool isEncrypted;
        uint256 startTime;
        uint256 endTime;
        uint256 revealTime;
    }
    
    struct RankingUpdate {
        euint32 updateId;
        euint32 playerId;
        euint32 newScore;
        euint32 newRank;
        euint32 previousRank;
        bool isEncrypted;
        uint256 timestamp;
    }
    
    mapping(uint256 => Player) public players;
    mapping(uint256 => Cycle) public cycles;
    mapping(uint256 => RankingUpdate) public rankingUpdates;
    mapping(address => uint256) public playerAddressToId;
    mapping(uint256 => euint32) public encryptedLeaderboard;
    
    uint256 public playerCounter;
    uint256 public cycleCounter;
    uint256 public updateCounter;
    
    address public owner;
    address public verifier;
    
    event PlayerRegistered(uint256 indexed playerId, address indexed playerAddress, string playerName);
    event ScoreUpdated(uint256 indexed playerId, uint256 indexed cycleId, uint32 newScore);
    event RankingUpdated(uint256 indexed playerId, uint256 indexed cycleId, uint32 newRank, uint32 previousRank);
    event CycleStarted(uint256 indexed cycleId, uint256 startTime, uint256 endTime);
    event CycleEnded(uint256 indexed cycleId, uint256 revealTime);
    event LeaderboardRevealed(uint256 indexed cycleId);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    function registerPlayer(string memory _playerName) public returns (uint256) {
        require(bytes(_playerName).length > 0, "Player name cannot be empty");
        require(playerAddressToId[msg.sender] == 0, "Player already registered");
        
        uint256 playerId = playerCounter++;
        
        players[playerId] = Player({
            playerId: FHE.asEuint32(0), // Will be set properly later
            score: FHE.asEuint32(0),
            rank: FHE.asEuint32(0),
            previousRank: FHE.asEuint32(0),
            isActive: true,
            isEncrypted: true,
            playerName: _playerName,
            playerAddress: msg.sender,
            lastUpdate: block.timestamp,
            cycleId: cycleCounter
        });
        
        playerAddressToId[msg.sender] = playerId;
        
        emit PlayerRegistered(playerId, msg.sender, _playerName);
        return playerId;
    }
    
    function updateScore(
        uint256 playerId,
        externalEuint32 newScore,
        bytes calldata inputProof
    ) public {
        require(players[playerId].playerAddress == msg.sender, "Only player can update their score");
        require(players[playerId].isActive, "Player is not active");
        require(cycles[players[playerId].cycleId].isActive, "Current cycle is not active");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalScore = FHE.fromExternal(newScore, inputProof);
        
        // Store previous rank for comparison
        euint32 previousRank = players[playerId].rank;
        
        // Update player score
        players[playerId].score = internalScore;
        players[playerId].lastUpdate = block.timestamp;
        
        // Create ranking update record
        uint256 updateId = updateCounter++;
        rankingUpdates[updateId] = RankingUpdate({
            updateId: FHE.asEuint32(0), // Will be set properly later
            playerId: FHE.asEuint32(0), // Will be set properly later
            newScore: internalScore,
            newRank: FHE.asEuint32(0), // Will be calculated off-chain
            previousRank: previousRank,
            isEncrypted: true,
            timestamp: block.timestamp
        });
        
        emit ScoreUpdated(playerId, players[playerId].cycleId, 0); // Score will be decrypted off-chain
    }
    
    function updateRanking(
        uint256 playerId,
        euint32 newRank,
        euint32 previousRank
    ) public onlyVerifier {
        require(players[playerId].playerAddress != address(0), "Player does not exist");
        require(players[playerId].isActive, "Player is not active");
        
        players[playerId].previousRank = players[playerId].rank;
        players[playerId].rank = newRank;
        players[playerId].lastUpdate = block.timestamp;
        
        emit RankingUpdated(playerId, players[playerId].cycleId, 0, 0); // Ranks will be decrypted off-chain
    }
    
    function startNewCycle(uint256 _duration) public onlyOwner returns (uint256) {
        require(_duration > 0, "Duration must be positive");
        
        uint256 cycleId = cycleCounter++;
        uint256 startTime = block.timestamp;
        uint256 endTime = startTime + _duration;
        uint256 revealTime = endTime + 3600; // 1 hour delay for reveal
        
        cycles[cycleId] = Cycle({
            cycleId: FHE.asEuint32(0), // Will be set properly later
            totalPlayers: FHE.asEuint32(0), // Will be calculated
            activePlayers: FHE.asEuint32(0), // Will be calculated
            isActive: true,
            isEncrypted: true,
            startTime: startTime,
            endTime: endTime,
            revealTime: revealTime
        });
        
        emit CycleStarted(cycleId, startTime, endTime);
        return cycleId;
    }
    
    function endCycle(uint256 cycleId) public onlyOwner {
        require(cycles[cycleId].isActive, "Cycle is not active");
        require(block.timestamp >= cycles[cycleId].endTime, "Cycle has not ended yet");
        
        cycles[cycleId].isActive = false;
        
        emit CycleEnded(cycleId, cycles[cycleId].revealTime);
    }
    
    function revealLeaderboard(uint256 cycleId) public onlyOwner {
        require(!cycles[cycleId].isActive, "Cycle must be ended first");
        require(block.timestamp >= cycles[cycleId].revealTime, "Reveal time has not been reached");
        
        cycles[cycleId].isEncrypted = false;
        
        // Mark all players in this cycle as unencrypted
        for (uint256 i = 0; i < playerCounter; i++) {
            if (players[i].cycleId == cycleId) {
                players[i].isEncrypted = false;
            }
        }
        
        emit LeaderboardRevealed(cycleId);
    }
    
    function getPlayerInfo(uint256 playerId) public view returns (
        string memory playerName,
        address playerAddress,
        uint8 score,
        uint8 rank,
        uint8 previousRank,
        bool isActive,
        bool isEncrypted,
        uint256 lastUpdate,
        uint256 cycleId
    ) {
        Player storage player = players[playerId];
        return (
            player.playerName,
            player.playerAddress,
            0, // FHE.decrypt(player.score) - will be decrypted off-chain
            0, // FHE.decrypt(player.rank) - will be decrypted off-chain
            0, // FHE.decrypt(player.previousRank) - will be decrypted off-chain
            player.isActive,
            player.isEncrypted,
            player.lastUpdate,
            player.cycleId
        );
    }
    
    function getCycleInfo(uint256 cycleId) public view returns (
        uint8 totalPlayers,
        uint8 activePlayers,
        bool isActive,
        bool isEncrypted,
        uint256 startTime,
        uint256 endTime,
        uint256 revealTime
    ) {
        Cycle storage cycle = cycles[cycleId];
        return (
            0, // FHE.decrypt(cycle.totalPlayers) - will be decrypted off-chain
            0, // FHE.decrypt(cycle.activePlayers) - will be decrypted off-chain
            cycle.isActive,
            cycle.isEncrypted,
            cycle.startTime,
            cycle.endTime,
            cycle.revealTime
        );
    }
    
    function getRankingUpdateInfo(uint256 updateId) public view returns (
        uint8 playerId,
        uint8 newScore,
        uint8 newRank,
        uint8 previousRank,
        bool isEncrypted,
        uint256 timestamp
    ) {
        RankingUpdate storage update = rankingUpdates[updateId];
        return (
            0, // FHE.decrypt(update.playerId) - will be decrypted off-chain
            0, // FHE.decrypt(update.newScore) - will be decrypted off-chain
            0, // FHE.decrypt(update.newRank) - will be decrypted off-chain
            0, // FHE.decrypt(update.previousRank) - will be decrypted off-chain
            update.isEncrypted,
            update.timestamp
        );
    }
    
    function getPlayerIdByAddress(address playerAddress) public view returns (uint256) {
        return playerAddressToId[playerAddress];
    }
    
    function isPlayerRegistered(address playerAddress) public view returns (bool) {
        return playerAddressToId[playerAddress] != 0;
    }
    
    function getCurrentCycle() public view returns (uint256) {
        return cycleCounter > 0 ? cycleCounter - 1 : 0;
    }
    
    function getTotalPlayers() public view returns (uint256) {
        return playerCounter;
    }
    
    function getTotalCycles() public view returns (uint256) {
        return cycleCounter;
    }
}
