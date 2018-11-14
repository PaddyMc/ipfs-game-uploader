import gametracker from '../services/contract-utils/gametracker';
import web3 from '../services/contract-utils/web3';

const updateAllFunderData = (totalAmountFunded, topFunder, numberOfFunders, allFunders) => ({
  type: 'UPDATE_ALL_FUNDER_DATA',
  totalAmountFunded,
  topFunder,
  numberOfFunders,
  allFunders
})


const getAmountFunded = async () => {
  const [accounts] = await web3.eth.getAccounts();
  let promises = []

  promises.push(gametracker.methods.getTotalAmountFunded().call({
    from: accounts
  }))
  promises.push(gametracker.methods.getNumberOfFunders().call({
    from: accounts
  }))
  return Promise.all(promises)
}

const getAllFunders = async (numberOfFunders) => {
  const [accounts] = await web3.eth.getAccounts();
  let promises = []

  for (let i = 0; i < numberOfFunders; i++) {
    promises.push(gametracker.methods.getFunderDataByNum(i).call({
      from: accounts
    }))
  }
  return Promise.all(promises)
}

const sortAllFunders = (allFunders) => {
  allFunders = allFunders.sort((funder1, funder2) => {
    return Number(funder2[1]) - Number(funder1[1]) 
  })
  return allFunders
}

export const getFunderData = () => async (dispatch, getState) => {
  const funderData = await getAmountFunded()
  const totalAmountFunded = funderData[0]
  const numberOfFunders = funderData[1]
  let allFunders = await getAllFunders(numberOfFunders)
  allFunders = sortAllFunders(allFunders)
  const topFunder = allFunders[0] ? allFunders[0] : {"no":"no"}
  dispatch(updateAllFunderData(totalAmountFunded, topFunder, numberOfFunders, allFunders))
}