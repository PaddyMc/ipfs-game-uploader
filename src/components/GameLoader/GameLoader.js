import React from 'react';
import './GameLoader.css';

import GameDetails from './GameDetails/GameDetails'

const GameLoader = props => {
  const {
    numberOfGames,
    allGames,
    hideGameLoader,
    getAmountFunded,
    url,
  } = props
  
  return (
    <div>
      <div className="game-text-element">
        Number of Games: {numberOfGames}
      </div>
      <hr/>
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

export default GameLoader;