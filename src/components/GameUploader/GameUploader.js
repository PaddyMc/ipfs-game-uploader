import React, { Component } from 'react';

import UploaderTable from './UploaderTable/UploaderTable';
import UploaderActions from './UploaderActions/UploaderActions';
import './GameUploader.css';

class GameUploader extends Component {
  render() { 
    const {
      files,
      onSubmit,
      captureFile,
      captureImage,
      resetValuesUI,
      getHash,
      numberOfHashes,
      ipfsHash,
      ethAddress,
      transactionHash,
      blockNumber,
      gasUsed
    } = this.props

    return (
      <div className="shape">
        <div className="marginLeft">
          <UploaderActions 
            files= {files}
            onSubmit= {onSubmit}
            captureFile = {captureFile}
            captureImage = {captureImage}
            resetValuesUI = {resetValuesUI}
            getHash = {getHash}
            numberOfHashes = {numberOfHashes}
          />
          <hr/>
          <UploaderTable 
            ipfsHash={ipfsHash}
            ethAddress={ethAddress}
            transactionHash={transactionHash}
            blockNumber={blockNumber}
            gasUsed={gasUsed}
          />
        </div>
      </div>
    );
  } 
}
export default GameUploader;