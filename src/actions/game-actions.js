import { Types } from '@requestnetwork/request-network.js';

import web3 from '../services/contract-utils/web3';
import ipfs from '../services/ipfs';
import gametracker from '../services/contract-utils/gametracker';
import requestNetwork from '../services/requestnetwork';

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

const getFileUploaded = async (ipfsHash) => {
  return ipfs.get(ipfsHash)
} 

const getDescription = async (ipfsHash) => {
  var description = `${ipfsHash}/description.txt`
  return getFileUploaded(description);
}

const getImage = async (ipfsHash) => {
  var image = `${ipfsHash}/image.png`
  return getFileUploaded(image);
}

const getTotalHashes = async () => {
  const [account] = await web3.eth.getAccounts();
  return gametracker.methods.getNumberOfHashes().call({
    from: account 
  })
}

const getAllInfoByPosition = async (numberOfGames) => {
  const [account] = await web3.eth.getAccounts();
  let promises = []
  for(let i = 0; i < numberOfGames; i++){
    promises.push(gametracker.methods.getHashByNum(i).call({
      from: account
    }))
    promises.push(gametracker.methods.getOwnerForGame(i).call({
      from: account
    }))
  }
  return Promise.all(promises)
}

export const getGameData = () => async (dispatch, getState) => {
  const numberOfGames = await getTotalHashes()
  const getAllInfoByPositionData = await getAllInfoByPosition(numberOfGames)
  let allGames = []
  for(let i = 2; i < getAllInfoByPositionData.length + 1; i++){
    if(i % 2 === 0) {
      // Optimize here!!!
      let description = await getDescription(getAllInfoByPositionData[i-2])
      description = description ?  Buffer.from(description[0].content) : "None"
      allGames.push({
        number : i / 2,
        gameHash : getAllInfoByPositionData[i-2],
        gameOwner : getAllInfoByPositionData[i-1],
        description: description.toString()
      })
      //this.getImageData(data[i-2], i / 2)
    }
  }
  dispatch(updateAllGameData(numberOfGames, allGames))
  dispatch(updateLoaded(true))
}

export const hideGameLoader = (visibility) => (dispatch) => {
  dispatch(gameLoaderVisible(visibility))
}

// Game Renderer Actions
export const getAmountFunded = async (number) => {
  const [accounts] = await web3.eth.getAccounts();
  return gametracker.methods.getAccountForGame(number).call({
    from: accounts,
  });
}

export const fundUploader = async (number) => {
  const [account] = await web3.eth.getAccounts();
  gametracker.methods.fundGameOwner(number).send({
    from: account,
    value: web3.utils.toWei('0.2', "ether")
  }, (err, data) => {
    console.log(data)
  });

  // var event = gametracker.events.UpdatedBalance({from: loadedAccounts});
  // event.subscribe((err, result) => { 
  //     if (err) {
  //         console.log(err)
  //         return;
  //     }
  //     console.log(result)
  // });

  var eventETHDeposited = gametracker.events.ETHDeposited({from: account});
  eventETHDeposited.subscribe((err, result) => { 
    if (err) {
      return;
    }
    console.log(result)
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

