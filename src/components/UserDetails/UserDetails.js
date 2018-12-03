import React from 'react';

import './UserDetails.css';
import UserInfo from './UserInfo/UserInfo';
import UserGames from './UserGames/UserGames';


const UserDetails = props => {
  const {
    numberOfGames,
    fundingData,
    gameLocations,
    hideGameLoader
  } = props

  return (
    <div className="">
      <UserInfo 
        numberOfGames={numberOfGames}
        fundingData={fundingData}
      />
      <UserGames 
        gameLocations={gameLocations} 
        hideGameLoader={hideGameLoader}
      />
    </div>
  );
}

export default UserDetails;