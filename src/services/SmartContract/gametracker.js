import web3 from './web3';
import { RINKEBY, TEST } from '../../constants/constants'
//0x7462cd6f63cc2ba43a663f515525e52fc1337a19
//0xe27fcc33409308a83e2aeaf0b117c5f53d14107e
//0x573e7a796470898a134c1ffb5b900598c76cc85d
//0xcb4f7ceb474af71679c3c4381a682aa6c0ff9839

const address = TEST ? TEST : RINKEBY
//const address = "0xe36f2111a151438553a6dd5afee4b1d277057a75"

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "position",
				"type": "uint256"
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
		"constant": true,
		"inputs": [],
		"name": "totalETH",
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
		"constant": false,
		"inputs": [
			{
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"name": "name",
				"type": "bytes32"
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
		"inputs": [],
		"name": "getTopFunder",
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
				"type": "bytes32"
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
				"name": "",
				"type": "address"
			}
		],
		"name": "totalTokenBalances",
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
				"name": "token",
				"type": "address"
			}
		],
		"name": "baseTokenBalance",
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
		"name": "baseETHBalance",
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
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "topFunder",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "topFunds",
				"type": "uint256"
			}
		],
		"name": "TopFunder",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "orginalOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "TransferOwnership",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "account",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "ETHDeposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "account",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "ETHSent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "fromAccount",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "toAccount",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "ETHTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "fromAccount",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "toAccount",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TokenTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "account",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "token",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TokenDeposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "account",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "token",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TokenSent",
		"type": "event"
	}
]

export default new web3.eth.Contract(abi, address);