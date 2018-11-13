import extend from 'xtend'
let newState

const funders = (state, action) => {
  var fundersState = extend({
    intro: "Funders",
    welcomeText: "All Funder statistics",
    totalAmountFunded: "",
    topFunder: {},
    numberOfFunders: "",
    allFunders: [],
  }, state)

  switch (action.type) {
    case 'TOTAL_AMOUNT_FUNDED':
      newState = extend(fundersState, {
        totalAmountFunded: action.totalAmountFunded
      })      
      return newState
    case 'TOP_FUNDER':
      newState = extend(fundersState, {
        topFunder: action.topFunder
      })
      return newState
    case 'NUMBER_OF_FUNDERS':
      newState = extend(fundersState, {
        numberOfFunders: action.numberOfFunders
      })
      return newState
    case 'ALL_FUNDERS':
      newState = extend(fundersState, {
        allFunders: action.allFunders
      })
      return newState
    case 'UPDATE_ALL_FUNDER_DATA':
      newState = extend(fundersState, {
        totalAmountFunded: action.totalAmountFunded,
        topFunder: action.topFunder,
        numberOfFunders: action.numberOfFunders,
        allFunders: action.allFunders
      })
      return newState
    default:
      return fundersState
  }
}

export default funders