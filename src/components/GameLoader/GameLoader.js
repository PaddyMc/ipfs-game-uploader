import React, { Component } from 'react';
import './GameLoader.css';

import GameDetails from './GameDetails/GameDetails'

class GameLoader extends Component {
  render() {
    const {
      numberOfGames,
      allGames,
      hideGameLoader,
      getAmountFunded,
      fundUploader,
      sendRequestToBuy
    } = this.props
    return (
      <div>
        <div>
          <GameDetails 
            numberOfGames={numberOfGames} 
            allGames={allGames}
            hideGameLoader = {hideGameLoader}
            getAmountFunded = {getAmountFunded}
            fundUploader = {fundUploader}
            sendRequestToBuy = {sendRequestToBuy}
          />
        </div>
      </div>
    );
  }
}

export default GameLoader;