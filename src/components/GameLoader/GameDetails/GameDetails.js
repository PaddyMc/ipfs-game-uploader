import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GameDetails.css';

class GameDetails extends Component {
  render() {
    const {
      numberOfGames,
      allGames,
      hideGameLoader,
    } = this.props
    return (
      <div>
        <div className="game-text-element">
          Number of Games: {numberOfGames}
        </div>
        <hr/>
        <div>
        {
          allGames.map((game, index) => {
            let output = 
            <div className="gameloader-info-container" key={index}>
              <div className="gameloader-container">
                <div className="gameloader-infoText">Number:</div>
                <div>{game.number}</div>
              </div>
              <div className="gameloader-container">
                <div className="gameloader-infoText">Location:</div>
                <Link className="gameloader-link" onClick={() => hideGameLoader(true)} to={ { pathname: `/game/${game.gameHash}` } }>
                  {game.gameHash}
                </Link>
              </div>
              <div className="gameloader-container">
                <div className="gameloader-infoText">Owner:</div>
                <div>{game.gameOwner}</div>
              </div>
              <div className="gameloader-container">
                <div className="gameloader-infoText">Description:</div>
                <div>{game.description}</div>
              </div>
              <hr/>
            </div>
            return output
          })
        }
        </div>
      </div>
    );
  }
}

export default GameDetails;