import React from 'react';

import UploaderTable from './UploaderTable/UploaderTable';
import UploaderActions from './UploaderActions/UploaderActions';
import './GameUploader.css';

const GameUploader = props => { 
  const {
    files,
    onSubmit,
    captureFile,
    resetValuesUI,
    getHash,
    numberOfHashes,
    folderName,
    ipfsHash,
    ethAddress,
    transactionHash,
    blockNumber,
    gasUsed
  } = props

  return (
    <div className="shape">
      <div className="marginLeft">
        <UploaderActions 
          files= {files}
          onSubmit= {onSubmit}
          captureFile = {captureFile}
          resetValuesUI = {resetValuesUI}
          getHash = {getHash}
          numberOfHashes = {numberOfHashes}
          folderName = {folderName}
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
export default GameUploader;