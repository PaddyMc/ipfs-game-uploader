import web3 from './web3';

const address = '0x7462cd6f63cc2ba43a663f515525e52fc1337a19';

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "upload",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
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
	}
]


// const address = '0xb7ec370c889b3b48ec537e0b2c887faedceb254a';

// const abi = [
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getHash",
//     "outputs": [
//       {
//         "name": "x",
//         "type": "string"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "x",
//         "type": "string"
//       }
//     ],
//     "name": "sendHash",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ]

export default new web3.eth.Contract(abi, address);