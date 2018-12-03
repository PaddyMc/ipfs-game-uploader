import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './GameActions.css';

const GameActions = props => {
  const {
    ipfsHash,
    gameOwner,
    fundUploader,
    sendRequestToBuy
  } = props

  return (
    <div className="gameloader-container">
      <form 
        className="gamerenderer-button" 
        onSubmit={(event) => {
          event.preventDefault()
          fundUploader(ipfsHash)
        }}>
        <Button 
          className="button"
          type="submit"> 
            Fund Game Uploader
        </Button>
      </form>
      <form 
        className="gamerenderer-button" 
        onSubmit={(event) => {
          event.preventDefault()
          sendRequestToBuy(gameOwner)
        }}>
        <Button 
          className="button"
          type="submit"> 
            Request To Buy
        </Button>
      </form>
    </div>
  );
}

export default GameActions;