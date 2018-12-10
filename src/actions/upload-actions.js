import web3 from '../services/contract-utils/web3';
import IPFS from 'ipfs-api';
import gametracker from '../services/contract-utils/gametracker';

import { ipfsInfura, ipfsLocal } from '../constants/constants'

const updateNumberOfHashes = (numberOfHashes) => ({
  type: 'NUMBER_OF_HASHES',
  numberOfHashes
})

const updateFiles = (files, fileCount) => ({
  type: 'ADD_FILES',
  files,
  fileCount
})

const updateImage = (image) => ({
  type: 'ADD_IMAGE',
  image
})

const updateDocument = (document) => ({
  type: 'ADD_DOCUMENT',
  document
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

const updateFolderName = (folderName) => ({
  type: 'ADD_FOLDER_NAME',
  folderName
})

const updateDocumentName = (documentName) => ({
  type: 'UPDATE_DOCUMENT_NAME',
  documentName
})

const updateImageName = (imageName) => ({
  type: 'UPDATE_IMAGE_NAME',
  imageName
})

// Functions
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
  }

  if(validateDescription && validateImage && validateIndex && validateFiles) {
    return true
  }

  return false
}

const getFolderPath = (folderPath) => {
  if(folderPath === "") {
    return new Date().getTime()
  } else {
    return folderPath
  }
}

// Exports
export const captureFile = (event, object) => async (dispatch, getState) => {
  event.stopPropagation()
  event.preventDefault()
  let folderPath = getState().upload.folderName
  dispatch(updateFolderName(getFolderPath(folderPath)))
  folderPath = getState().upload.folderName
  var files = []
  var fileCount = 0

  for (let file of event.target.files) {
    let reader = new window.FileReader()
    let relativePath
    if(object === "folder") {
      let constructedFileStructure = file.webkitRelativePath.split('/')
      if(constructedFileStructure.length > 2) {
        constructedFileStructure.shift()
        relativePath = `${folderPath}/${constructedFileStructure}`.replace(/,/g, '/')
      } else {
        relativePath = `${folderPath}/${constructedFileStructure[1]}`
      }
    } else if(object === "instructions") {
      relativePath = `${folderPath}/introDocument.md`
      dispatch(updateDocumentName(file.name))
    } else if(object === "image") {
      relativePath = `${folderPath}/imageForGameUploader.png`
      dispatch(updateImageName(file.name))
    } 
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => convertToBuffer(reader.result, relativePath, files)
    fileCount++
  }

  if(object === "folder") {
    dispatch(updateFiles(files, fileCount))
  } else if(object === "image") {
    dispatch(updateImage(files))
  } else if(object === "instructions") {
    dispatch(updateDocument(files))
  }
};

export const uploadToIPFS = (files) => async (dispatch, getState) => {
  dispatch(resetValues())
  const state = getState()
  const form = state.form.contact.values
  const ipfsURL = state.game.gameRenderer.url
  const image = state.upload.image
  const document = state.upload.document
  const accounts = await web3.eth.getAccounts();
  const ethAddress = await gametracker.options.address;
  
  
  if(files.length > 1 && form && image.length === 1) {
    await convertToBuffer(JSON.stringify(form), `${files[0].path.split('/')[0]}/description.txt`, files)
    files.push(image[0])
    files.push(document[0])

    if(validateFiles(files)) {
      const ipfs = selectIPFSLocation(ipfsURL)
      let ipfsHash = await ipfs.add(files)
      
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
      return new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    case ipfsLocal:
      return new IPFS({ host: 'localhost',  port: 5001,  protocol: 'http' });
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
  return errors
}
