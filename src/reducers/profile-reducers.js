import extend from 'xtend'
let newState

const profile = (state, action) => {
  var profileState = extend({
    intro: "Profile",
    welcomeText: "This is your Profile, there are many like it but this one is yours",
    numberOfGames: "",
    fundingData: "",
    gameLocations: [],
  }, state)

  switch (action.type) {
    case 'NUMBER_OF_GAMES':
      newState = extend(profileState, {
        numberOfGames: action.numberOfGames
      })      
      return newState

    case 'FUNDING_DATA':
      newState = extend(profileState, {
        fundingData: action.fundingData
      })
      return newState

    case 'GAME_LOCATIONS':
      newState = extend(profileState, {
        gameLocations: action.gameLocations
      })
      return newState
    default:
      return profileState
  }
}

export default profile