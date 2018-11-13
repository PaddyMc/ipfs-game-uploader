import { connect } from 'react-redux'
import { getFunderData } from '../../actions/actions'

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

  return {
    intro,
    welcomeText,
    totalAmountFunded,
    topFunder,
    numberOfFunders,
    allFunders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFunderData: () => dispatch(getFunderData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Funder)