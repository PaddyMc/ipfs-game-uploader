import { connect } from 'react-redux'
import { getGameData,
         hideGameLoader,
         changeGamePage
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
    gameRenderer,
    pageNumber,
    numberOfPages,
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
    pageNumber,
    numberOfPages,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateGameData: () => dispatch(getGameData()),
    hideGameLoader: (visibility) => dispatch(hideGameLoader(visibility)),
    changeGamePage: (incrementPage) => dispatch(changeGamePage(incrementPage))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)