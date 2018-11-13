import gametracker from '../services/contract-utils/gametracker';
import web3 from '../services/contract-utils/web3';

const updateNumberOfGames = (numberOfGames) => ({
  type: 'NUMBER_OF_GAMES',
  numberOfGames
})

const updateFundingData = (fundingData) => ({
  type: 'FUNDING_DATA',
  fundingData
})

const updateGameLocations = (gameLocations) => ({
  type: 'GAME_LOCATIONS',
  gameLocations
})

// Profile Smart Contract Functions
const getNumberOfGamesFromSmartContract = async () => {
  const [account] = await web3.eth.getAccounts();
  return gametracker.methods.getTotalGamesForOwner(account).call({
    from: account
  })
}

const getFundingDataFromSmartContract = async () => {
  const [account] = await web3.eth.getAccounts();
  return gametracker.methods.getAmountFundedByAddress(account).call({
    from: account
  }) 
}

const getGameDataFromSmartContract = async (numberOfGames) => {
  const [account] = await web3.eth.getAccounts();
  let promises = []
  for(let i = 0; i < numberOfGames; i++){
    promises.push(gametracker.methods.getIPFSHashForOwner(account, i).call({
      from: account
    }))
  }
  return Promise.all(promises)
}

// Get all profile data
export const getProfileData = () => async (dispatch, getState) => {
  const numberOfGames = await getNumberOfGamesFromSmartContract()
  dispatch(updateNumberOfGames(numberOfGames))

  const fundingData = await getFundingDataFromSmartContract()
  
  dispatch(updateFundingData(web3.utils.fromWei(fundingData , "ether")))

  const gameData = await getGameDataFromSmartContract(numberOfGames)
  dispatch(updateGameLocations(gameData))
}