import React from 'react';
import CustomPopUp from '../../PopUp/PopUp'
import GameInformationPopUp from '../../GameLoader/GameDetails/GameInformationPopUp/GameInformationPopUp'
import FunderForm from './FunderForm/FunderForm'
import './GameActions.css';

const GameActions = props => {
  const {
    ipfsHash,
    // gameOwner,
    fundUploader,
    // sendRequestToBuy,
    url
  } = props

  return (
    <div className="gameloader-container">
    <div>
      <CustomPopUp 
        buttonText = {"Game Information"}
        info = {`${url}${ipfsHash}/introDocument.md`}
        Content = {GameInformationPopUp}
      />
    </div>
    <div className="">
      <CustomPopUp 
        buttonText = {"Fund Uploader"}
        otherInfo = {ipfsHash}
        info = {fundUploader}
        Content = {FunderForm}
      />
    </div>
    <div>
      {/* <Button 
        className="button"
        onClick={() => {
          sendRequestToBuy(gameOwner)
        }}>
          Request To Buy
      </Button> */}
    </div>
    </div>
  );
}

export default GameActions;