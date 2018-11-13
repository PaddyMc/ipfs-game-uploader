import { connect } from 'react-redux'
import { getProfileData } from '../../actions/actions'

import Profile from './Profile.component.js'

const mapStateToProps = (state) => {
  const {
    intro,
    welcomeText,
    numberOfGames,
    fundingData,
    gameLocations,
  } = state.profile

  return {
    intro,
    welcomeText,
    numberOfGames,
    fundingData,
    gameLocations,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfileData: () => dispatch(getProfileData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)