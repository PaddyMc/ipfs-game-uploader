const fs = require("fs")
const solc = require('solc')
const Web3 = require('web3');

// migrate to using ganache core

// var Ganache = require("ganache-core");
// var server = Ganache.server();
// server.listen(7545, function(err, blockchain) {
//   if(err) { console.log(err) }
// });
// const web3 = new Web3(Ganache.provider())

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

findImports = (path) => {
  switch (path) {
    case ( "lib/math.sol" ):
      return { 
        contents: fs.readFileSync('./smartcontract/contracts/lib/math.sol', 'utf8')
      }
    case ( "Accounting.sol" ):
      return { 
        contents: fs.readFileSync('./smartcontract/contracts/Accounting.sol', 'utf8')
      }
    case ( "lib/erc20.sol" ):
      return { 
        contents: fs.readFileSync('./smartcontract/contracts/lib/erc20.sol', 'utf8'), 
      }
    default:
      return { 
        error: 'File not found'
      }
  }
}

uploadGame = (accounts, abi, address) => {
  const gametracker = new web3.eth.Contract(JSON.parse(abi), address);
  gametracker.methods.upload("QmPXgPCzbdviCVJTJxvYCWtMuRWCKRfNRVcSpARHDKFShd", web3.utils.toHex('Hope')).send({
    from: accounts[0],
    gas: 1060982
  }, (error, transactionHash) => {
    if (error) { throw(error) }
    console.log(transactionHash);
  });
}

updateSmartContractInWebUI = async (address) => {
  let constants = await fs.readFileSync('./src/constants/constants.js', 'utf8')
  let updated = constants.replace("null", `'${address}'`);
  fs.writeFileSync('./src/constants/constants.js', updated, 'utf8');
}

deploySmartContract = async () => {
  const accounts = await web3.eth.getAccounts();

  const input = {
    'GameTracker.sol': fs.readFileSync('./smartcontract/contracts/GameTracker.sol', 'utf8'),
  };
  
  const compiledContract = solc.compile({sources: input}, 1, findImports);
  const abi = compiledContract.contracts['GameTracker.sol:GameTracker'].interface;
  const bytecode = `0x${compiledContract.contracts['GameTracker.sol:GameTracker'].bytecode}`;
  const gasEstimate = await web3.eth.estimateGas({data: bytecode});

  const gametracker =  new web3.eth.Contract(JSON.parse(abi))

  const contract = gametracker.deploy({
    data: bytecode
  });

  const params = {
    from: accounts[0],
    gas: gasEstimate
  }

  contract.send(params, (error, transactionHash) => {
    if (error) {
      console.log(error);
    } 
    })
    .on('error', (error) => {
      console.log(error);
    })
    .on('receipt', (receipt) => {
      uploadGame(accounts, abi, receipt.contractAddress)
      updateSmartContractInWebUI(receipt.contractAddress)
    })
}

deploySmartContract()

module.exports = {
  deploySmartContract,
}

// No problem at all @bdresser .

// Thanks for the feedback, I'll update the PR in a few days.

// How did you find the spacing between the navigation container and the network container?