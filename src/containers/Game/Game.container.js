import { connect } from 'react-redux'
import { getGameData,
         hideGameLoader,
         fundUploader,
         sendRequestToBuy
       } from '../../actions/actions'

import Game from './Game.component'

const mapStateToProps = (state) => {
  const {
    intro,
    welcomeText,
    gameloader,
    numberOfGames,
    allGames,
    loaded,
  } = state.game

  return {
    intro,
    welcomeText,
    gameloader,
    numberOfGames,
    allGames,
    loaded,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateGameData: () => dispatch(getGameData()),
    hideGameLoader: (visibility) => dispatch(hideGameLoader(visibility)),
    
    fundUploader: fundUploader,
    sendRequestToBuy: sendRequestToBuy,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)