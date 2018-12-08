import React from 'react';
import Web3 from 'web3'
import EthIcon from '../../EthIcon/EthIcon'
import './GameInfo.css';

const GameInfo = props => {
  const {
    gameOwner,
    description,
    gameFundingData
  } = props
  
  return (
    <div className="spacing">
    <div className="gameloader-container ">
      <div className="gameloader-infoText">Game Owner:</div>
      <div>{gameOwner}</div>
    </div>
    <div className="gameloader-container">
      <div className="gameloader-infoText">Description:</div>
      <div>{description}</div>
    </div>
    <div className="gameloader-container">
      <div className="gameloader-infoText">Funded:</div>
      <EthIcon 
        amount={Web3.utils.fromWei(gameFundingData.toString() , "ether")}
      />
    </div>
    </div>
  );

}

export default GameInfo;