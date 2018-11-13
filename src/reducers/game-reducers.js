import extend from 'xtend'
let newState

const game = (state, action) => {
  var gameState = extend({
    intro: "Games",
    welcomeText: "Select a location and play a game",
    gameloader: false,
    numberOfGames: "0",
    allGames: [],
    loaded: false
  }, state)

  switch (action.type) {
    case 'UPDATE_ALL_GAME_DATA':
      newState = extend(gameState, {
        numberOfGames: action.numberOfGames,
        allGames: action.allGames
      })
      return newState
    case 'LOADED':
      newState = extend(gameState, {
        loaded: action.loaded
      })
      return newState
    case 'GAME_LOADER_VISIBLE':
      newState = extend(gameState, {
        gameloader: action.gameloader
      })
      return newState
    default:
      return gameState
  }
}

export default game