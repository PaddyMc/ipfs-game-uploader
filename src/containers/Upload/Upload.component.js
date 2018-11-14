import React, { Component } from 'react'
import ReturnButton from '../../components/ReturnButton/ReturnButton'
import GameUploader from '../../components/GameUploader/GameUploader'
import Header from '../../components/Header/Header'
import Helmet from 'react-helmet'

import PropTypes from 'prop-types'

import './Upload.css';

class Upload extends Component {
  static propTypes = {
    intro: PropTypes.string,
    welcomeText: PropTypes.string,
    ipfsHash: PropTypes.string,
    files: PropTypes.array,
    ethAddress: PropTypes.string,
    blockNumber: PropTypes.number,
    transactionHash: PropTypes.string,
    gasUsed: PropTypes.number,
    numberOfHashes: PropTypes.string,
    getAllHashes: PropTypes.func,
    captureFile: PropTypes.func,
    submitFilesAndCallSmartContract: PropTypes.func,
    resetValuesUI: PropTypes.func
  }

  componentWillMount = () => {
    const { getAllHashes } = this.props
    getAllHashes()
  }

  render() { 
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
      getAllHashes,
      captureFile,
      submitFilesAndCallSmartContract,
      resetValuesUI,
    } = this.props

    return (
      <div className="shape">
        <Helmet title={intro} />
        <ReturnButton>{this.props}</ReturnButton>
        <Header 
          intro = {intro}
          welcomeText = {welcomeText}
        />
        <GameUploader 
          files={files}
          onSubmit={submitFilesAndCallSmartContract}
          captureFile = {captureFile}
          getHash = {getAllHashes}
          numberOfHashes = {numberOfHashes}
          resetValuesUI = {resetValuesUI}

          ipfsHash={ipfsHash}
          ethAddress={ethAddress}
          transactionHash={transactionHash}
          blockNumber={blockNumber}
          gasUsed={gasUsed}
        />
      </div>
    );
  }
}

export default Upload