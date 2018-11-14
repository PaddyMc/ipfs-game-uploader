import { connect } from 'react-redux'
import { hideGameLoader,
         getGameRendererData,
         hideGameRenderer,
         fundUploader,
         sendRequestToBuy
       } from '../../actions/actions'

import GameRenderer from './GameRenderer.component'

const mapStateToProps = (state) => {
  const {
    ipfsHash,
    gameOwner,
    description,
    gameFundingData,
    url,
    index,
  } = state.game.gameRenderer

  const {
    gameRendererLoading,
  } = state.game

  return {
    ipfsHash,
    gameOwner,
    description,
    gameFundingData,
    url,
    index,
    gameRendererLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGameRendererData: (ipfsHash) => dispatch(getGameRendererData(ipfsHash)),
    hideGameLoader: (visibility) => dispatch(hideGameLoader(visibility)),
    hideGameRenderer: (visibility) => dispatch(hideGameRenderer(visibility)),
    
    fundUploader: fundUploader,
    sendRequestToBuy: sendRequestToBuy,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameRenderer)