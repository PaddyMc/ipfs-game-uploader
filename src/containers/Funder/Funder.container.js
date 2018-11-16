import { connect } from 'react-redux'
import { getFunderData,
         getGameData
       } from '../../actions/actions'

import Funder from './Funder.component.js'

const mapStateToProps = (state) => {
  const {
    intro,
    welcomeText,
    totalAmountFunded,
    topFunder,
    numberOfFunders,
    allFunders,
  } = state.funders

  const {
    sortedGameFundedData
  } = state.game

  return {
    intro,
    welcomeText,
    totalAmountFunded,
    topFunder,
    numberOfFunders,
    allFunders,
    sortedGameFundedData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFunderData: () => dispatch(getFunderData()),
    updateGameData: () => dispatch(getGameData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Funder)