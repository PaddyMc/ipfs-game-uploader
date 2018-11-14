import React, { Component } from 'react';
import './GameRenderer.css';

import GameIFrame from './GameIFrame/GameIFrame'
import GameActions from './GameActions/GameActions'
import GameInfo from './GameInfo/GameInfo'

class GameRenderer extends Component {
  constructor(props){
    super(props)
    if(this.props.location.state){
      this.state = {
        number: this.props.location.state.number,
        ipfsHash: this.props.location.state.gameHash,
        gameOwner: this.props.location.state.gameOwner,
        description: this.props.location.state.description,
        hideGameLoader: this.props.location.state.hideGameLoader,
        fundUploader: this.props.location.state.fundUploader,
        sendRequestToBuy: this.props.location.state.sendRequestToBuy,
        getAmountFunded: this.props.location.state.getAmountFunded,
        url: "https://ipfs.infura.io/ipfs/",
        index: "index.html",
        gameFundingData: "0",
      }
    } else {
      this.state = {
        number: null,
        ipfsHash: null,
        gameOwner: null,
        description: null,
        hideGameLoader: null,
        fundUploader: null,
        sendRequestToBuy: null,
        getAmountFunded: null,
        url: "https://ipfs.infura.io/ipfs/",
        index: "index.html",
        gameFundingData: "0",
      }
    }
    // gameFundingData => store!
  }
  
  componentWillMount = async () => {
    if(this.state.getAmountFunded){
      let amountFunded = await this.state.getAmountFunded(this.state.number - 1)
      this.setState({gameFundingData : amountFunded[1]})
    }
  }

  componentWillUnmount = () => {
    this.state.hideGameLoader(false)
  }

  render() {
    return (
      <div>
        <div className="gamerenderer-actions">
          <div className="gamerenderer-spacer">
            <GameInfo 
              gameOwner={this.state.gameOwner}
              description={this.state.description}
              gameFundingData={this.state.gameFundingData}
            />
          </div>
          <div>
            <GameActions 
              ipfsHash={this.state.ipfsHash}
              gameOwner={this.state.gameOwner}
              gameNumber={this.state.number}
              fundUploader={this.state.fundUploader}
              sendRequestToBuy={this.state.sendRequestToBuy}
            />
          </div>
        </div>
        <GameIFrame 
          location={`${this.state.url}/${this.state.ipfsHash}/${this.state.index}`} 
          title={this.state.welcomeText} 
        />
      </div>
    );
  }
}

export default GameRenderer;