import { connect } from 'react-redux'
import { getProfileData,
         hideGameLoader
       } from '../../actions/actions'

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
    updateProfileData: () => dispatch(getProfileData()),
    hideGameLoader: (visibility) => dispatch(hideGameLoader(visibility))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)