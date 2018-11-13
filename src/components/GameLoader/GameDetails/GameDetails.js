import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GameDetails.css';

class GameDetails extends Component {
  addFunctionsToProps = (game) => {
    game.hideGameLoader = this.props.hideGameLoader
    game.getAmountFunded = this.props.getAmountFunded
    game.fundUploader = this.props.fundUploader
    game.sendRequestToBuy = this.props.sendRequestToBuy
    return game
  }

  render() {
    return (
      <div>
        <div className="game-text-element">
          Number of Games: {this.props.numberOfGames}
        </div>
        <hr/>
        <div>
        {
          this.props.allGames.map((game, index) => {
            let props = this.addFunctionsToProps(game)
            let output = 
            <div className="gameloader-info-container" key={index}>
              <div className="gameloader-container">
                <div className="gameloader-infoText">Number:</div>
                <div>{game.number}</div>
              </div>
              <div className="gameloader-container">
                <div className="gameloader-infoText">Location:</div>
                <Link className="gameloader-link" onClick={() => this.props.hideGameLoader(true)} to={ { pathname: `/game/${game.gameHash}`, state: props } }>
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