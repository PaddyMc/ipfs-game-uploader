import React, { Component } from 'react';
import Web3 from 'web3'

import './GameInfo.css';

class GameInfo extends Component {
  render() {
    return (
      <div>
        <div className="gameloader-container">
            <div className="gameloader-infoText">Game Owner:</div>
            <div>{this.props.gameOwner}</div>
        </div>
        <div className="gameloader-container">
            <div className="gameloader-infoText">Description:</div>
            <div>{this.props.description}</div>
        </div>
        <div className="gameloader-container">
            <div className="gameloader-infoText">Total Amount Funded:</div>
            <div>{Web3.utils.fromWei(this.props.gameFundingData.toString() , "ether")} Eth</div>
        </div>
      </div>
    );
  }
}

export default GameInfo;