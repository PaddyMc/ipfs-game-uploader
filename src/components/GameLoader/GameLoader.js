import React, { Component } from 'react';
import './GameLoader.css';

import GameDetails from './GameDetails/GameDetails'

class GameLoader extends Component {
  componentWillMount = () => {
    this.props.hideGameLoader(false)
  }
  render() {
    return (
      <div>
        <div>
          <GameDetails 
            numberOfGames={this.props.numberOfGames} 
            allGames={this.props.allGames}
            hideGameLoader = {this.props.hideGameLoader}
            getAmountFunded = {this.props.getAmountFunded}
            fundUploader = {this.props.fundUploader}
            sendRequestToBuy = {this.props.sendRequestToBuy}
          />
        </div>
      </div>
    );
  }
}

export default GameLoader;