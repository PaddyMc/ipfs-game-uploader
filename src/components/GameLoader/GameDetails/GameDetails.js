import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GameDetails.css';

class GameDetails extends Component {
    render() {
        return (
          <div>
          {
              this.props.allGames.map((game, index) => {
                  let output = 
                  <div className="gameloader-info-container" key={index}>
                      <div className="gameloader-container">
                          <div className="gameloader-infoText">Number:</div>
                          <div>{game.number}</div>
                      </div>
                      <div className="gameloader-container">
                          <div className="gameloader-infoText">Location:</div>
                          <Link className="gameloader-link" to={ { pathname: `/game/${game.gameHash}`, state: game } }>
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
        );
    }
}

export default GameDetails;