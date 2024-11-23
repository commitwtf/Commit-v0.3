export const COMMIT_ABI = [
	{
		"type": "constructor",
		"inputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "receive",
		"stateMutability": "payable"
	},
	{
		"type": "function",
		"name": "BASIS_POINTS",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "UPGRADE_INTERFACE_VERSION",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "string",
				"internalType": "string"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "V1_COMMIT_CREATION_FEE",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "V1_MAX_CREATOR_SHARE",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "V1_MAX_DEADLINE_DURATION",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "V1_MAX_DESCRIPTION_LENGTH",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "V1_PROTOCOL_SHARE",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "addAllowedToken",
		"inputs": [
			{
				"name": "token",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "cancelCommitment",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "claimCancelled",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "claimCreator",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "claimProtocolFees",
		"inputs": [
			{
				"name": "token",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "claimRewards",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "createCommitment",
		"inputs": [
			{
				"name": "_tokenAddress",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "_stakeAmount",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "_joinFee",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "_creatorShare",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "_description",
				"type": "string",
				"internalType": "string"
			},
			{
				"name": "_joinDeadline",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "_fulfillmentDeadline",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "payable"
	},
	{
		"type": "function",
		"name": "emergencyCancelCommitment",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "emergencyPauseAll",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "emergencyUnpauseAll",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "emergencyWithdrawToken",
		"inputs": [
			{
				"name": "token",
				"type": "address",
				"internalType": "contract IERC20"
			},
			{
				"name": "amount",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "getCommitmentCreator",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentCreatorClaim",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentCreatorClaimed",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentCreatorShare",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentDescription",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "string",
				"internalType": "string"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentDetails",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "creator",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "stakeAmount",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "joinFee",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "participantCount",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "description",
				"type": "string",
				"internalType": "string"
			},
			{
				"name": "status",
				"type": "uint8",
				"internalType": "enum CommitProtocol.CommitmentStatus"
			},
			{
				"name": "timeRemaining",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentFulfillmentDeadline",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentJoinDeadline",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentJoinFee",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentParticipantAt",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "_index",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentParticipants",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "address[]",
				"internalType": "address[]"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentStakeAmount",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentStatus",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint8",
				"internalType": "enum CommitProtocol.CommitmentStatus"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentTokenAddress",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentWinnerAt",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "_index",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentWinnerClaim",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getCommitmentWinners",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "address[]",
				"internalType": "address[]"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getNumCommitmentParticipants",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getNumCommitmentWinners",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "hasCommitmentWinnerClaimed",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "_user",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "bool",
				"internalType": "bool"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "initialize",
		"inputs": [
			{
				"name": "_protocolFeeAddress",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "joinCommitment",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "nextCommitmentId",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "owner",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "paused",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "bool",
				"internalType": "bool"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "protocolFeeAddress",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "protocolFees",
		"inputs": [
			{
				"name": "",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"name": "",
				"type": "uint256",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "proxiableUUID",
		"inputs": [],
		"outputs": [
			{
				"name": "",
				"type": "bytes32",
				"internalType": "bytes32"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "removeAllowedToken",
		"inputs": [
			{
				"name": "token",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "renounceOwnership",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "resolveCommitment",
		"inputs": [
			{
				"name": "_id",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "_winners",
				"type": "address[]",
				"internalType": "address[]"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "setProtocolFeeAddress",
		"inputs": [
			{
				"name": "_newAddress",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "transferOwnership",
		"inputs": [
			{
				"name": "newOwner",
				"type": "address",
				"internalType": "address"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "upgradeToAndCall",
		"inputs": [
			{
				"name": "newImplementation",
				"type": "address",
				"internalType": "address"
			},
			{
				"name": "data",
				"type": "bytes",
				"internalType": "bytes"
			}
		],
		"outputs": [],
		"stateMutability": "payable"
	},
	{
		"type": "event",
		"name": "CommitmentCancelled",
		"inputs": [
			{
				"name": "id",
				"type": "uint256",
				"indexed": true,
				"internalType": "uint256"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "CommitmentCreated",
		"inputs": [
			{
				"name": "id",
				"type": "uint256",
				"indexed": true,
				"internalType": "uint256"
			},
			{
				"name": "creator",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "tokenAddress",
				"type": "address",
				"indexed": false,
				"internalType": "address"
			},
			{
				"name": "stakeAmount",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			},
			{
				"name": "joinFee",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			},
			{
				"name": "creatorShare",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			},
			{
				"name": "description",
				"type": "string",
				"indexed": false,
				"internalType": "string"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "CommitmentEmergencyCancelled",
		"inputs": [
			{
				"name": "id",
				"type": "uint256",
				"indexed": true,
				"internalType": "uint256"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "CommitmentJoined",
		"inputs": [
			{
				"name": "id",
				"type": "uint256",
				"indexed": true,
				"internalType": "uint256"
			},
			{
				"name": "participant",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "CommitmentResolved",
		"inputs": [
			{
				"name": "id",
				"type": "uint256",
				"indexed": true,
				"internalType": "uint256"
			},
			{
				"name": "winners",
				"type": "address[]",
				"indexed": false,
				"internalType": "address[]"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "CreatorClaimed",
		"inputs": [
			{
				"name": "id",
				"type": "uint256",
				"indexed": true,
				"internalType": "uint256"
			},
			{
				"name": "user",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "token",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "amount",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "EmergencyWithdrawal",
		"inputs": [
			{
				"name": "token",
				"type": "address",
				"indexed": false,
				"internalType": "address"
			},
			{
				"name": "amount",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "FeesClaimed",
		"inputs": [
			{
				"name": "recipient",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "token",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "amount",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "Initialized",
		"inputs": [
			{
				"name": "version",
				"type": "uint64",
				"indexed": false,
				"internalType": "uint64"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "OwnershipTransferred",
		"inputs": [
			{
				"name": "previousOwner",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "newOwner",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "Paused",
		"inputs": [
			{
				"name": "account",
				"type": "address",
				"indexed": false,
				"internalType": "address"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "ProtocolFeeAddressUpdated",
		"inputs": [
			{
				"name": "oldAddress",
				"type": "address",
				"indexed": false,
				"internalType": "address"
			},
			{
				"name": "newAddress",
				"type": "address",
				"indexed": false,
				"internalType": "address"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "RewardsClaimed",
		"inputs": [
			{
				"name": "id",
				"type": "uint256",
				"indexed": true,
				"internalType": "uint256"
			},
			{
				"name": "user",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "token",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "amount",
				"type": "uint256",
				"indexed": false,
				"internalType": "uint256"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "TokenListUpdated",
		"inputs": [
			{
				"name": "token",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			},
			{
				"name": "allowed",
				"type": "bool",
				"indexed": false,
				"internalType": "bool"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "Unpaused",
		"inputs": [
			{
				"name": "account",
				"type": "address",
				"indexed": false,
				"internalType": "address"
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "Upgraded",
		"inputs": [
			{
				"name": "implementation",
				"type": "address",
				"indexed": true,
				"internalType": "address"
			}
		],
		"anonymous": false
	},
	{
		"type": "error",
		"name": "AddressEmptyCode",
		"inputs": [
			{
				"name": "target",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "AlreadyJoined",
		"inputs": []
	},
	{
		"type": "error",
		"name": "CommitmentNotExists",
		"inputs": [
			{
				"name": "id",
				"type": "uint256",
				"internalType": "uint256"
			}
		]
	},
	{
		"type": "error",
		"name": "ContractPaused",
		"inputs": []
	},
	{
		"type": "error",
		"name": "DirectDepositsNotAllowed",
		"inputs": []
	},
	{
		"type": "error",
		"name": "DuplicateWinner",
		"inputs": [
			{
				"name": "winner",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "ERC1967InvalidImplementation",
		"inputs": [
			{
				"name": "implementation",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "ERC1967NonPayable",
		"inputs": []
	},
	{
		"type": "error",
		"name": "ETHTransferFailed",
		"inputs": []
	},
	{
		"type": "error",
		"name": "EnforcedPause",
		"inputs": []
	},
	{
		"type": "error",
		"name": "ExpectedPause",
		"inputs": []
	},
	{
		"type": "error",
		"name": "FailedCall",
		"inputs": []
	},
	{
		"type": "error",
		"name": "FulfillmentPeriodNotEnded",
		"inputs": [
			{
				"name": "currentTime",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "deadline",
				"type": "uint256",
				"internalType": "uint256"
			}
		]
	},
	{
		"type": "error",
		"name": "InsufficientBalance",
		"inputs": [
			{
				"name": "available",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "required",
				"type": "uint256",
				"internalType": "uint256"
			}
		]
	},
	{
		"type": "error",
		"name": "InvalidAddress",
		"inputs": []
	},
	{
		"type": "error",
		"name": "InvalidCreationFee",
		"inputs": [
			{
				"name": "sent",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "required",
				"type": "uint256",
				"internalType": "uint256"
			}
		]
	},
	{
		"type": "error",
		"name": "InvalidFeeConfiguration",
		"inputs": [
			{
				"name": "total",
				"type": "uint256",
				"internalType": "uint256"
			}
		]
	},
	{
		"type": "error",
		"name": "InvalidInitialization",
		"inputs": []
	},
	{
		"type": "error",
		"name": "InvalidState",
		"inputs": [
			{
				"name": "status",
				"type": "uint8",
				"internalType": "enum CommitProtocol.CommitmentStatus"
			}
		]
	},
	{
		"type": "error",
		"name": "InvalidTokenContract",
		"inputs": [
			{
				"name": "token",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "InvalidWinner",
		"inputs": [
			{
				"name": "winner",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "JoiningPeriodEnded",
		"inputs": [
			{
				"name": "currentTime",
				"type": "uint256",
				"internalType": "uint256"
			},
			{
				"name": "deadline",
				"type": "uint256",
				"internalType": "uint256"
			}
		]
	},
	{
		"type": "error",
		"name": "NoCreatorClaim",
		"inputs": []
	},
	{
		"type": "error",
		"name": "NoRewardsToClaim",
		"inputs": []
	},
	{
		"type": "error",
		"name": "NotInitializing",
		"inputs": []
	},
	{
		"type": "error",
		"name": "OwnableInvalidOwner",
		"inputs": [
			{
				"name": "owner",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "OwnableUnauthorizedAccount",
		"inputs": [
			{
				"name": "account",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "ReentrancyGuardReentrantCall",
		"inputs": []
	},
	{
		"type": "error",
		"name": "SafeERC20FailedOperation",
		"inputs": [
			{
				"name": "token",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "TokenNotAllowed",
		"inputs": [
			{
				"name": "token",
				"type": "address",
				"internalType": "address"
			}
		]
	},
	{
		"type": "error",
		"name": "UUPSUnauthorizedCallContext",
		"inputs": []
	},
	{
		"type": "error",
		"name": "UUPSUnsupportedProxiableUUID",
		"inputs": [
			{
				"name": "slot",
				"type": "bytes32",
				"internalType": "bytes32"
			}
		]
	},
	{
		"type": "error",
		"name": "UnauthorizedAccess",
		"inputs": [
			{
				"name": "caller",
				"type": "address",
				"internalType": "address"
			}
		]
	}

] as const
