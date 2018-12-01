import { connect } from 'react-redux'
import { getGameData,
         hideGameLoader,
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
    gameRenderer
  } = state.game

  const url = gameRenderer.url

  return {
    intro,
    welcomeText,
    gameloader,
    numberOfGames,
    allGames,
    loaded,
    url,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateGameData: () => dispatch(getGameData()),
    hideGameLoader: (visibility) => dispatch(hideGameLoader(visibility)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)