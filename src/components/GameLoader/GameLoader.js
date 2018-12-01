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
      url,
    } = this.props
    return (
      <div>
        <GameDetails 
          numberOfGames={numberOfGames} 
          allGames={allGames}
          hideGameLoader = {hideGameLoader}
          getAmountFunded = {getAmountFunded}
          url = {url}
        />
      </div>
    );
  }
}

export default GameLoader;