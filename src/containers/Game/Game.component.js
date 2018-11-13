import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import Header from '../../components/Header/Header';
import GameLoader from '../../components/GameLoader/GameLoader';
import Helmet from 'react-helmet';

import PropTypes from 'prop-types'

import './Game.css';

class Game extends Component {
  static propTypes = {
    intro: PropTypes.string,
    welcomeText: PropTypes.string,
    gameloader: PropTypes.bool,
    numberOfGames: PropTypes.string,
    allGames: PropTypes.array,
    loaded: PropTypes.bool,
    updateGameData: PropTypes.func,
    hideGameLoader: PropTypes.func,
    getAmountFunded: PropTypes.func,
    fundUploader: PropTypes.func,
    sendRequestToBuy: PropTypes.func,
  }

  componentWillMount = () => {
    const { updateGameData } = this.props
    updateGameData()
  }

  render() {
    const {
      intro,
      welcomeText,
      gameloader,
      numberOfGames,
      allGames,
      loaded,
      hideGameLoader,
      getAmountFunded,
      fundUploader,
      sendRequestToBuy
    } = this.props

    return (
      <div className="shape">
        <Helmet title={intro} />
        <ReturnButton>{this.props}</ReturnButton>
        <Header 
          intro = {intro}
          welcomeText = {welcomeText}
        />
        {
          gameloader || 
            (
              <GameLoader
                numberOfGames={numberOfGames}
                allGames={allGames}

                //Renderer
                hideGameLoader={hideGameLoader}
                getAmountFunded={getAmountFunded}
                fundUploader={fundUploader}
                sendRequestToBuy={sendRequestToBuy}
              /> 
            )
        }
        {
          loaded || (<div>Loading....</div>)
        }
      </div>
    );
  }
}

export default Game