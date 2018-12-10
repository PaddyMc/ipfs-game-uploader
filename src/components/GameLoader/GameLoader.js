import React from 'react';
import './GameLoader.css';

import GameDetails from './GameDetails/GameDetails'
import GamePagination from './GamePagination/GamePagination'

const GameLoader = props => {
  const {
    numberOfGames,
    allGames,
    hideGameLoader,
    getAmountFunded,
    url,
    loaded,
    changeGamePage,
    pageNumber,
    numberOfPages,
  } = props
  
  return (
    <div>
      {
        loaded ? 
          (
            <div>
              <div className="game-text-element">
                Number of Games: {numberOfGames}
              </div>
              <hr/>
              <GameDetails 
                numberOfGames = {numberOfGames} 
                allGames = {allGames}
                hideGameLoader = {hideGameLoader}
                getAmountFunded = {getAmountFunded}
                url = {url}
                pageNumber = {pageNumber}
                numberOfPages = {numberOfPages}
              />
              <GamePagination
                changeGamePage = {changeGamePage}
                pageNumber = {pageNumber}
                numberOfPages = {numberOfPages}
                
              />
            </div>
          ) : (<div>Loading....</div>)
      }
      
    </div>
  );
}

export default GameLoader;