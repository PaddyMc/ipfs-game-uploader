import web3 from '../services/contract-utils/web3';
import IPFS from 'ipfs-api';
import gametracker from '../services/contract-utils/gametracker';

import { ipfsInfura, ipfsLocal } from '../constants/constants'

const updateNumberOfHashes = (numberOfHashes) => ({
  type: 'NUMBER_OF_HASHES',
  numberOfHashes
})

const updateFiles = (files) => ({
  type: 'ADD_FILES',
  files
})

const updateImage = (image) => ({
  type: 'ADD_IMAGE',
  image
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

const clearFiles = () => ({
  type: 'CLEAR_FILES'
})

// Functions
export const captureFile = (event) => async (dispatch, getState) => {
  event.stopPropagation()
  event.preventDefault()
  const folderPath = getState().upload.numberOfHashes
  var files = []

  for (let file of event.target.files) {
    let reader = new window.FileReader()
    let relativePath = `${folderPath}/${file.webkitRelativePath.split('/')[1]}`
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => convertToBuffer(reader.result, relativePath, files)
  }
  dispatch(updateFiles(files))
};

export const captureImage = (event) => async (dispatch, getState) => {
  event.stopPropagation()
  event.preventDefault()
  const folderPath = getState().upload.numberOfHashes
  var files = []

  for (let file of event.target.files) {
    let reader = new window.FileReader()
    let relativePath = `${folderPath}/imageForGameUploader.png`
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => convertToBuffer(reader.result, relativePath, files)
  }
  dispatch(updateImage(files))
};

const convertToBuffer = async (reader, folderPath, files) => {
  const buffer = await Buffer.from(reader);
  files.push({path : folderPath, content : buffer})
};

const validateFiles = (files) => {
  let validateFiles = false
  let validateDescription = false;
  let validateImage = false;
  let validateIndex = false;
  for(let file of files) {
    if(file){
      const filename = file.path.split('/')[1]
      if(filename === 'description.txt') {
        validateDescription = true
      } else if(filename === 'imageForGameUploader.png') {
        validateImage = true
      } else if('index.html'){
        validateIndex = true
      }
    }
  }

  if(files.length >= 2) {
    validateFiles = true
    console.log(validateFiles, "vaildate")
  }

  if(validateDescription && validateImage && validateIndex && validateFiles) {
    return true
  }

  return false
}

export const uploadToIPFS = (files) => async (dispatch, getState) => {
  dispatch(resetValues())
  const form = getState().form.contact.values
  const ipfsURL = getState().game.gameRenderer.url
  const image = getState().upload.image
  const accounts = await web3.eth.getAccounts();
  const ethAddress = await gametracker.options.address;
  
  if(files.length > 1 && form && image.length === 1) {
    await convertToBuffer(JSON.stringify(form), `${files[0].path.split('/')[0]}/description.txt`, files)
    files.push(image[0])

    if(validateFiles(files)) {
      const ipfs = selectIPFSLocation(ipfsURL)
      const ipfsHash = await ipfs.add(files);

      dispatch(updateIPFSHash(ipfsHash[ipfsHash.length-1].hash))
      dispatch(updateEthAddress(ethAddress));
      
      console.log('Sending from Metamask account: ' + accounts[0]);
      const result = await gametracker.methods.upload(ipfsHash[ipfsHash.length-1].hash).send({
                              from: accounts[0] 
                            })
      dispatch(updateTransactionHash(result.transactionHash))
      dispatch(updateTransactionReciept(result.gasUsed, result.blockNumber))
      dispatch(clearFiles())
    }
  }
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
  switch(url) {
    case ipfsInfura:
      return  new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    case ipfsLocal:
      return new IPFS('localhost', '5001', { protocol:'http' });
    default:
      break
  }
}

export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } 
  if (!values.description) {
    errors.description = 'Required'
  } 
  if (!values.instructions) {
    errors.instructions = 'Required'
  }
  return errors
}

// export const warn = values => {
//   const warnings = {}
//   if (values.age < 19) {
//     warnings.age = 'Hmm, you seem a bit young...'
//   }
//   return warnings
// }

