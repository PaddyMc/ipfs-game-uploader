import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import UserDetails from '../../components/UserDetails/UserDetails';
import Header from '../../components/Header/Header';
import Helmet from 'react-helmet';

import './Profile.css';

import PropTypes from 'prop-types'

class Profile extends Component {
  static propTypes = {
    intro: PropTypes.string,
    welcomeText: PropTypes.string,
    numberOfGames: PropTypes.string,
    fundingData: PropTypes.string,
    gameLocations: PropTypes.array,
    updateProfileData: PropTypes.func,
  }

  componentWillMount = () => {
    const {
      updateProfileData
    } = this.props

    updateProfileData()
  }

  render() {
    const {
      intro,
      welcomeText,
      numberOfGames,
      fundingData,
      gameLocations,
    } = this.props
    return (
      <div>
        <Helmet title={intro} />
        <ReturnButton>{this.props}</ReturnButton>
        <Header 
          intro = {intro}
          welcomeText = {welcomeText}
        />
        <UserDetails
          numberOfGames={numberOfGames}
          fundingData={fundingData}
          gameLocations={gameLocations}
        />
      </div>
    );
  }
}

export default Profile