import React from 'react';
import { Button } from 'react-bootstrap';
import CustomPopUp from '../../PopUp/PopUp'
import GameInformationPopUp from '../../GameLoader/GameDetails/GameInformationPopUp/GameInformationPopUp'
import './GameActions.css';

const GameActions = props => {
  const {
    ipfsHash,
    gameOwner,
    fundUploader,
    sendRequestToBuy,
    url
  } = props

  return (
    <div className="gameloader-container">
    <div>
      <CustomPopUp 
        buttonText = {"Game Information"}
        gameHash = {ipfsHash}
        info = {`${url}${ipfsHash}/introDocument.md`}
        Content = {GameInformationPopUp}
      />
    </div>
    <div className="">
      <Button 
        className="button"
        onClick={() => {
          fundUploader(ipfsHash)
        }}> 
          Fund Game Uploader
      </Button>
    </div>
    <div>
      <Button 
        className="button"
        onClick={() => {
          sendRequestToBuy(gameOwner)
        }}>
          Request To Buy
      </Button>
    </div>
    </div>
  );
}

export default GameActions;