import React, { Component } from 'react';

import './UserDetails.css';
import UserInfo from './UserInfo/UserInfo';
import UserGames from './UserGames/UserGames';


class UserDetails extends Component {
  render() {
    return (
      <div className="">
        <UserInfo 
          numberOfGames={this.props.numberOfGames}
          fundingData={this.props.fundingData}
        />
        <UserGames 
          gameLocations={this.props.gameLocations} 
        />
      </div>
    );
  }
}

export default UserDetails;