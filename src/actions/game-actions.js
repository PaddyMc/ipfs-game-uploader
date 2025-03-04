import { Types } from '@requestnetwork/request-network.js';
import web3 from '../services/contract-utils/web3';
import gametracker from '../services/contract-utils/gametracker';
import requestNetwork from '../services/requestnetwork';
import { selectIPFSLocation } from './upload-actions'
import { ipfsInfura, ipfsLocal } from '../constants/constants'

const updateAllGameData = (numberOfGames, allGames) => ({
  type: 'UPDATE_ALL_GAME_DATA',
  numberOfGames,
  allGames
})

const updateLoaded = (loaded) => ({
  type: 'LOADED',
  loaded
})

const gameLoaderVisible = (gameloader) => ({
  type: 'GAME_LOADER_VISIBLE',
  gameloader
})

const updateGameRendererData = (ipfsHash, gameOwner, gameFundingData, description) => ({
  type: 'GAME_RENDERER_DATA',
  ipfsHash,
  gameOwner,
  gameFundingData,
  description
})

const updateIPFSLocation = (url) => ({
  type: 'UPDATE_IPFS_LOCATION',
  url
})

const updateGameRendererLoading = (gameRendererLoading) => ({
  type: 'GAME_RENDERER_LOADING',
  gameRendererLoading
})

const updateGameFundingData = (sortedGameFundedData) => ({
  type: 'SORTED_GAME_DATA',
  sortedGameFundedData
})

const updatePageNumber = (pageNumber) => ({
  type: 'UPDATE_PAGE_NUMBER',
  pageNumber
})

const updateNumberOfPages = (numberOfPages) => ({
  type: 'UPDATE_NUMBER_OF_PAGES',
  numberOfPages
})

const getFileUploaded = async (ipfsHash, ipfs) => {
  return ipfs.get(ipfsHash)
} 

const getDescription = async (ipfsHash, ipfs) => {
  var description = `${ipfsHash}/description.txt`
  return getFileUploaded(description, ipfs);
}

const getTotalHashes = async () => {
  const [account] = await web3.eth.getAccounts();
  return gametracker.methods.getNumberOfHashes().call({
    from: account 
  })
}

const getAllInfoByPosition = async (startNumber, numberOfGames) => {
  const [account] = await web3.eth.getAccounts();
  let promises = []
  for(let i = startNumber; i < numberOfGames; i++){
    promises.push(gametracker.methods.getHashByNum(i).call({
      from: account
    }))
    promises.push(gametracker.methods.getOwnerForGame(i).call({
      from: account
    }))
  }
  return Promise.all(promises)
}

const sortAllGames = (newAllGames) => {
  newAllGames = newAllGames.sort((game1, game2) => {
    return Number(game2.gameFundedData) - Number(game1.gameFundedData) 
  })
  return newAllGames
}

const getGameDataFromXToY = async (start, end, gameState) => {
  const ipfsURL = gameState.gameRenderer.url
  const ipfs = selectIPFSLocation(ipfsURL)
  const getAllInfoByPositionData = await getAllInfoByPosition(start, end)
  let allGames = []
  for(let i = 2; i < getAllInfoByPositionData.length + 1; i++){
    if(i % 2 === 0) {
      // Optimize here!!!
      let description = getDescription(getAllInfoByPositionData[i-2], ipfs)
      let descriptionText = "null"
      await description.then((result)=>{
        descriptionText = result ?  JSON.parse(Buffer.from(result[0].content).toString()) : "None"
      }).catch(()=>{

      }).finally(()=>{
        allGames.push({
          number : i / 2,
          gameHash : getAllInfoByPositionData[i-2],
          gameOwner : getAllInfoByPositionData[i-1][0],
          gameFundedData: getAllInfoByPositionData[i-1][1],
          description: descriptionText.description,
          name: descriptionText.name
        })
      })
    }
  }
  return allGames
}

export const getGameData = () => async (dispatch, getState) => {
  dispatch(updateLoaded(false))
  const gameState = getState().game
  const pageSize = gameState.pageSize
  const pageNumber = gameState.pageNumber
  const numberOfLastGameOnPage = pageSize*pageNumber
  
  const numberOfGames = await getTotalHashes()
  dispatch(updateNumberOfPages(Math.ceil(numberOfGames/pageSize)))
  let gameNumber;

  if(numberOfLastGameOnPage > numberOfGames) {
    gameNumber = numberOfGames
  } else {
    gameNumber = numberOfLastGameOnPage
  }

  const games = await getGameDataFromXToY(numberOfLastGameOnPage-pageSize, gameNumber, gameState)
  dispatch(updateAllGameData(numberOfGames, games))
  dispatch(updateLoaded(true))

  // link with search function
  // var newAllGames = allGames.slice()
  // newAllGames = sortAllGames(newAllGames)
  // dispatch(updateGameFundingData(newAllGames))
}

export const changeGamePage = (nextPage) => (dispatch, getState) => {
  const gameState = getState().game
  const numberOfGames = gameState.numberOfGames
  const pageSize = gameState.pageSize
  let pageNumber = gameState.pageNumber
  if(nextPage) {
    if(pageSize * (pageNumber+1) < Number(numberOfGames) + Number(pageSize)) {
      pageNumber++
      dispatch(updatePageNumber(pageNumber))
      dispatch(getGameData())
    } else {
      //alert("No thanks")
    }
  } else {
    if(pageNumber > 1) {
      pageNumber--
      dispatch(updatePageNumber(pageNumber))
      dispatch(getGameData())
    } else {
      //alert("No thanks")
    }
  }
}

export const hideGameLoader = (visibility) => (dispatch) => {
  dispatch(gameLoaderVisible(visibility))
  dispatch(updateGameRendererLoading(visibility))
}

// Game Renderer Actions
export const getGameRendererData = (ipfsHash) => async (dispatch, getState) => {
  const ipfsURL = getState().game.gameRenderer.url
  const ipfs = selectIPFSLocation(ipfsURL)
  const [accounts] = await web3.eth.getAccounts();
  const gameFundingData = await gametracker.methods.getAccountForGame(ipfsHash).call({
    from: accounts,
  });
  let description = getDescription(ipfsHash, ipfs)
  let descriptionText = ""
  await description.then((result)=>{
    descriptionText = result ?  JSON.parse(Buffer.from(result[0].content).toString()) : "None"
  }).catch(()=>{}).finally(()=>{})
  dispatch(updateGameRendererData(ipfsHash, gameFundingData[0], gameFundingData[1], descriptionText.description))
  dispatch(updateGameRendererLoading(false))
}

export const fundUploader = (ipfsHash) => async (dispatch, getState) => {
  const funderForm = getState().form.fund
  const [account] = await web3.eth.getAccounts();

  var eventETHDeposited = gametracker.events.UpdatedBalance({from: account});
  eventETHDeposited.subscribe((err, result) => { 
    if (err) {
      return;
    }
    console.log(result)
  });

  gametracker.methods.fundGameOwner(ipfsHash).send({
    from: account,
    value: web3.utils.toWei(funderForm.values.fund, "ether")
  }, (err, data) => {
    //console.log(data)
  });
}

export const sendRequestToBuy = async (ownerAddress) => {
  const [payeeAddress] = await web3.eth.getAccounts();
  const payerAddress = ownerAddress;

  console.log(payeeAddress, payerAddress)

  const payerInfo = {
    idAddress: payerAddress,
    refundAddress: payerAddress,
  };

  const payeesInfo = [{
    idAddress: payeeAddress,
    paymentAddress: payeeAddress,
    expectedAmount: web3.utils.toWei('0.1', 'ether'),
  }];

  const { request } = await requestNetwork.createRequest(
    Types.Role.Payee,
    Types.Currency.ETH,
    payeesInfo,
    payerInfo,
  );
  // Pay a request
  await request.pay([web3.utils.toWei('0.1', 'ether')], [0], { from: payerAddress });
  const data = await request.getData();
  console.log(data.payee.expectedAmount.toString());
  console.log(data.payee.balance.toString());
}

export const changeIPFSLocation = (event) => (dispatch) => {
  switch(event.target.value) {
    case "infura":
      dispatch(updateIPFSLocation(ipfsInfura))
      break
    case "local":
      dispatch(updateIPFSLocation(ipfsLocal))
      break
    default:
      break
  }
}

export const validateFund = values => {
  const errors = {}
  if (!values.fund) {
    errors.fund = ''
  } else if (!/\d+(?:\.\d{1,2})?$/.test(values.fund)) {
    errors.fund = "Please enter a number"
  }
  return errors
}

