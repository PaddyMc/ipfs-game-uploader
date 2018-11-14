import web3 from './web3';
import { RINKEBY, TEST } from '../../constants/constants'
//0x7462cd6f63cc2ba43a663f515525e52fc1337a19
//0xe27fcc33409308a83e2aeaf0b117c5f53d14107e
//0x573e7a796470898a134c1ffb5b900598c76cc85d
//0xcb4f7ceb474af71679c3c4381a682aa6c0ff9839
//0xe36f2111a151438553a6dd5afee4b1d277057a75
const address = TEST ? TEST : RINKEBY

const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "ownerAddress",
				"type": "address"
			},
			{
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "getIPFSHashForOwner",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "fundGameOwner",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "position",
				"type": "uint256"
			}
		],
		"name": "getOwnerForGame",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "upload",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "ownerAddress",
				"type": "address"
			}
		],
		"name": "getTotalGamesForOwner",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalAmountFunded",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "position",
				"type": "uint256"
			}
		],
		"name": "getHashByNum",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "position",
				"type": "uint256"
			}
		],
		"name": "getAccountForGame",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "position",
				"type": "uint256"
			}
		],
		"name": "getFunderDataByNum",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "funderAddress",
				"type": "address"
			}
		],
		"name": "getAmountFundedByAddress",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfHashes",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "position",
				"type": "uint256"
			}
		],
		"name": "getFunderAddressByNum",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfFunders",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "getAllFundersForGame",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "Uploaded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "addressFunded",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "balanceETH",
				"type": "uint256"
			}
		],
		"name": "UpdatedBalance",
		"type": "event"
	}
]

export default new web3.eth.Contract(abi, address);