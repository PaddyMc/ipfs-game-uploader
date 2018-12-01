import { connect } from 'react-redux'
import { getAllHashes,
         captureFile,
         uploadToIPFS,
         resetValuesUI,
       } from '../../actions/actions'

import Upload from './Upload.component'

const mapStateToProps = (state) => {
  const {
    intro,
    welcomeText,
    ipfsHash,
    files,
    ethAddress,
    blockNumber,
    transactionHash,
    gasUsed,
    numberOfHashes,
    folderName
  } = state.upload

  return {
    intro,
    welcomeText,
    ipfsHash,
    files,
    ethAddress,
    blockNumber,
    transactionHash,
    gasUsed,
    numberOfHashes,
    folderName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllHashes: () => dispatch(getAllHashes()),
    captureFile: (event, object) => dispatch(captureFile(event, object)),
    submitFilesAndCallSmartContract: (files) => dispatch(uploadToIPFS(files)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload)