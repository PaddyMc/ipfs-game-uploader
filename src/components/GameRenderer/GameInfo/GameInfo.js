import React from 'react';
import Web3 from 'web3'

import './GameInfo.css';

const GameInfo = props => {
    const {
      gameOwner,
      description,
      gameFundingData
    } = props
    
    return (
      <div>
        <div className="gameloader-container">
            <div className="gameloader-infoText">Game Owner:</div>
            <div>{gameOwner}</div>
        </div>
        <div className="gameloader-container">
            <div className="gameloader-infoText">Description:</div>
            <div>{description}</div>
        </div>
        <div className="gameloader-container">
            <div className="gameloader-infoText">Total Amount Funded:</div>
            <div>{Web3.utils.fromWei(gameFundingData.toString() , "ether")} Eth</div>
        </div>
      </div>
    );

}

export default GameInfo;