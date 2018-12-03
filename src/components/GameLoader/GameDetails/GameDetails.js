import React from 'react';
import { Link } from 'react-router-dom';
import CustomPopUp from '../../PopUp/PopUp'
import GameInformationPopUp from './GameInformationPopUp/GameInformationPopUp'
import './GameDetails.css';

const GameDetails = props => {
  const {
    allGames,
    hideGameLoader,
    url
  } = props

  return (
    <div>
      <div>
        {
          allGames.map((game, index) => {
            let output = 
            <div key={index}>
              <div className="gameloader-info">
                <div className="gameloader-info-container" >
                  <div className="gameloader-container">
                    <div className="gameloader-infoText">Name:</div>
                    <div>{game.name}</div>
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
                </div>
                <div className="center-button">
                  <CustomPopUp 
                    buttonText = {"Game Information"}
                    gameHash = {game.gameHash}
                    info = {`${url}${game.gameHash}/introDocument.md`}
                    Content = {GameInformationPopUp}
                  />
                </div>
                <div className="gameloader-image">
                  <img src={`${url}${game.gameHash}/imageForGameUploader.png`} alt="Smiley face" height="64" width="64"></img>
                </div>
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

export default GameDetails;