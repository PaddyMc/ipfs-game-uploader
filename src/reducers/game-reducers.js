import extend from 'xtend'
let newState

const game = (state, action) => {
  var gameState = extend({
    intro: "Games",
    welcomeText: "Select a location and play a game",
    gameloader: false,
    numberOfGames: "0",
    allGames: [],
    loaded: false,
    gameRenderer : {
      ipfsHash: "",
      gameOwner: "",
      description: "",
      gameFundingData: "0",
      url: "https://ipfs.infura.io/ipfs/",
      index: "index.html",
    },
    gameRendererLoading: true,
    sortedGameFundedData: [],
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
    case 'GAME_RENDERER_DATA':
      newState = extend(gameState, {
        gameRenderer : { 
          ipfsHash: action.ipfsHash,
          gameOwner: action.gameOwner,
          gameFundingData: action.gameFundingData,
          description: action.description,
          url: gameState.gameRenderer.url,
          index: "index.html",
        }
      })
      return newState
    case 'GAME_RENDERER_LOADING':
      newState = extend(gameState, {
        gameRendererLoading: action.gameRendererLoading 
      })
      return newState
    case 'SORTED_GAME_DATA':
      newState = extend(gameState, {
        sortedGameFundedData: action.sortedGameFundedData 
      })
      return newState
    case 'UPDATE_IPFS_LOCATION':
      newState = extend(gameState, {
        gameRenderer: {
          ipfsHash: gameState.gameRenderer.ipfsHash,
          gameOwner: gameState.gameRenderer.gameOwner,
          gameFundingData: gameState.gameRenderer.gameFundingData,
          description: gameState.gameRenderer.description,
          url: action.url,
          index: "index.html",
        }
      })
      return newState
    default:
      return gameState
  }
}

export default game