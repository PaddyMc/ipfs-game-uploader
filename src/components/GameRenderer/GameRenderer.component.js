import React, { Component } from 'react';
import './GameRenderer.css';

import GameIFrame from './GameIFrame/GameIFrame'
import GameActions from './GameActions/GameActions'
import GameInfo from './GameInfo/GameInfo'

import PropTypes from 'prop-types'

class GameRenderer extends Component {
  static propTypes = {
    ipfsHash: PropTypes.string,
    gameOwner: PropTypes.string,
    description: PropTypes.string,
    gameFundingData: PropTypes.string,
    url: PropTypes.string,
    index: PropTypes.string,
    getGameRendererData: PropTypes.func,
    gameRendererLoading: PropTypes.bool,
    hideGameLoader: PropTypes.func,
    hideGameRenderer: PropTypes.func,
    getAmountFunded: PropTypes.func,
    fundUploader: PropTypes.func,
    sendRequestToBuy: PropTypes.func,
  }
  
  componentWillMount = async () => {
    const {
      hideGameLoader,
      getGameRendererData,
      hideGameRenderer,
      location
    } = this.props
    hideGameRenderer(true)
    hideGameLoader(true)
    getGameRendererData(location.pathname.split("/")[2])
  }

  componentWillUnmount = () => {
    const {
      hideGameLoader,
      hideGameRenderer
    } = this.props
    hideGameRenderer(false)
    hideGameLoader(false)
  }

  render() {
    const {
      gameOwner,
      description,
      gameFundingData,
      ipfsHash,
      url,
      index,
      gameRendererLoading,
      fundUploader,
      sendRequestToBuy
    } = this.props
    return (
      <div>
        {
          !gameRendererLoading ?
          (
            <div>
              <div className="gamerenderer-actions">
                <div className="gamerenderer-spacer">
                  <GameInfo 
                    gameOwner={gameOwner}
                    description={description}
                    gameFundingData={gameFundingData}
                  />
                </div>
                <div>
                  <GameActions 
                    ipfsHash={ipfsHash}
                    gameOwner={gameOwner}
                    fundUploader={fundUploader}
                    sendRequestToBuy={sendRequestToBuy}
                  />
                </div>
              </div>
              <GameIFrame 
                location={`${url}/${ipfsHash}/${index}`} 
              />
            </div>
          ): (<div>Loading...</div>)
        }
      </div>
    )}
}

export default GameRenderer;

