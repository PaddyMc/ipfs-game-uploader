import web3 from '../services/contract-utils/web3';
import IPFS from 'ipfs-api';
import gametracker from '../services/contract-utils/gametracker';

import { ipfsInfura, ipfsLocal } from '../constants/constants'

const updateNumberOfHashes = (numberOfHashes) => ({
  type: 'NUMBER_OF_HASHES',
  numberOfHashes
})

const updateFiles = (files) => ({
  type: 'FILES',
  files
})

const updateEthAddress = (ethAddress) => ({
  type: 'ETH_ADDRESS',
  ethAddress
})

const updateIPFSHash = (ipfsHash) => ({
  type: 'IPFS_HASH',
  ipfsHash
})

const updateTransactionHash = (transactionHash) => ({
  type: 'TRANSACTION_HASH',
  transactionHash
})

const updateTransactionReciept = (gasUsed, blockNumber) => ({
  type: 'TRANSACTION_RECIEPT',
  gasUsed,
  blockNumber
})

const resetValues = () => ({
  type: 'RESET_VALUES'
})

// Functions
export const captureFile = (event) => async (dispatch, getState) => {
  event.stopPropagation()
  event.preventDefault()
  var files = []
  for (let file of event.target.files) {
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => convertToBuffer(reader, file.webkitRelativePath, files)
  }
  dispatch(updateFiles(files))
};

const convertToBuffer = async (reader, folderPath, files) => {
  const buffer = await Buffer.from(reader.result);
  files.push({path : folderPath, content : buffer})
};

export const uploadToIPFS = (files) => async (dispatch, getState) => {
  const ipfsURL = getState().game.gameRenderer.url
  const accounts = await web3.eth.getAccounts();
  const ethAddress = await gametracker.options.address;

  dispatch(updateEthAddress(ethAddress));
  console.log('Sending from Metamask account: ' + accounts[0]);

  const ipfs = selectIPFSLocation(ipfsURL)
  console.log(files)
  const ipfsHash = await ipfs.add(files);

  dispatch(updateIPFSHash(ipfsHash[ipfsHash.length-1].hash))
  
  const result = await gametracker.methods.upload(ipfsHash[ipfsHash.length-1].hash).send({
                          from: accounts[0] 
                        })
  dispatch(updateTransactionHash(result.transactionHash))
  dispatch(updateTransactionReciept(result.gasUsed, result.blockNumber))
}

export const getAllHashes = () => async (dispatch, getState) => {
  const accounts = await web3.eth.getAccounts();
  const numberOfHashes = await gametracker.methods.getNumberOfHashes().call({
    from: accounts[0] 
  })
  dispatch(updateNumberOfHashes(numberOfHashes))
};

export const resetValuesUI = () => async (dispatch, getState) => {
  dispatch(resetValues())
}

export const selectIPFSLocation = (url) => {
  console.log(url)
  switch(url) {
    case ipfsInfura:
      return  new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    case ipfsLocal:
      return new IPFS('localhost', '5001', { protocol:'http' });
    default:
      break
  }
}
