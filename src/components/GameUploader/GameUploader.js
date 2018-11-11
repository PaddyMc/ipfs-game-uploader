import React, { Component } from 'react';

import './GameUploader.css';
import './UploaderActions/UploaderActions'
import './UploaderTable/UploaderTable'

import UploaderTable from './UploaderTable/UploaderTable';
import UploaderActions from './UploaderActions/UploaderActions';

class GameUploader extends Component {
  render() { 
    return (
      <div className="shape">
        <div className="marginLeft">
          <UploaderActions 
            onSubmit={this.props.onSubmit}
            captureFile = {this.props.captureFile}
            onClick = {this.props.onClick}
            getHash = {this.props.getHash}
            numberOfHashes = {this.props.numberOfHashes}
          />
          <hr/>
          <UploaderTable 
            ipfsHash={this.props.ipfsHash}
            ethAddress={this.props.ethAddress}
            transactionHash={this.props.transactionHash}
            blockNumber={this.props.blockNumber}
            gasUsed={this.props.gasUsed}
          />
        </div>
      </div>
    );
    } 
}
export default GameUploader;