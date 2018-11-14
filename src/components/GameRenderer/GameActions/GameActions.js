import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './GameActions.css';

class GameActions extends Component {
  fundUploader = (event) => {
    event.preventDefault()
    this.props.fundUploader(this.props.ipfsHash);
  }

  sendRequestToBuy = (event) => {
    event.preventDefault()
    this.props.sendRequestToBuy(this.props.gameOwner);
  }

  render() {
    return (
      <div className="gameloader-container">
        <form className="gamerenderer-button" onSubmit={this.fundUploader}>
          <Button 
            type="submit"> 
            Fund Game Uploader
          </Button>
        </form>
        <form className="gamerenderer-button" onSubmit={this.sendRequestToBuy}>
          <Button 
            type="submit"> 
            Request To Buy
          </Button>
        </form>
      </div>
    );
  }
}

export default GameActions;