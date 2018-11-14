import { connect } from 'react-redux'
import { getAllHashes,
         captureFile,
         uploadToIPFS,
         resetValuesUI
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
    numberOfHashes 
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
    numberOfHashes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllHashes: () => dispatch(getAllHashes()),
    captureFile: (event) => dispatch(captureFile(event)),
    submitFilesAndCallSmartContract: (files) => dispatch(uploadToIPFS(files)),
    resetValuesUI: () => dispatch(resetValuesUI())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload)