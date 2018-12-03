import extend from 'xtend'
let newState

const upload = (state, action) => {
  var uploadState = extend({
    intro: "Game Uploader",
    welcomeText: "Upload a Game; the folder must contain a runnable index.html",
    ipfsHash: '',
    files:[],
    ethAddress:'',
    blockNumber: 0,
    transactionHash:'',
    gasUsed: 0,
    numberOfHashes: '0',
    image : [],
    document : [],
    folderName: `${new Date().getTime()}`
  }, state)

  switch (action.type) {
    case 'NUMBER_OF_HASHES':
      newState = extend(uploadState, {
        numberOfHashes: action.numberOfHashes
      })
      return newState
    case 'ADD_FILES':
      newState = extend(uploadState, {
        files: action.files
      })
      return newState
    case 'ADD_IMAGE':
      newState = extend(uploadState, {
        image: action.image
      })
      return newState
    case 'ADD_DOCUMENT':
      newState = extend(uploadState, {
        document: action.document
      })
      return newState
    case 'ADD_FOLDER_NAME':
      newState = extend(uploadState, {
        folderName: action.folderName
      })
      return newState
    case 'CLEAR_FILES':
      newState = extend(uploadState, {
        files: [],
        image: [],
        document: [],
        folderName: ""
      })
      return newState
    case 'ETH_ADDRESS':
      newState = extend(uploadState, {
        ethAddress: action.ethAddress,
      })
      return newState
    case 'IPFS_HASH':
      newState = extend(uploadState, {
        ipfsHash: action.ipfsHash
      })
      return newState
    case 'TRANSACTION_HASH':
      newState = extend(uploadState, {
        transactionHash: action.transactionHash
      })
      return newState
    case 'TRANSACTION_RECIEPT':
      newState = extend(uploadState, {
        gasUsed: action.gasUsed,
        blockNumber: action.blockNumber
      })
      return newState
    case 'RESET_VALUES':
      newState = extend(uploadState, {
        ipfsHash: '',
        ethAddress: '',
        transactionHash: '',
        blockNumber: 0,
        gasUsed: 0
      })
      return newState
    default:
      return uploadState
  }
}

export default upload