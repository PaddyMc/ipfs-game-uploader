import React from 'react';
import EthIcon from '../../EthIcon/EthIcon'
import './UserInfo.css';

const UserInfo = props => {
  const {
    numberOfGames,
    fundingData
  } = props
  
  return (
    <div>
      <div>
        <div>
          Number of Games:
        </div>
        <div>
          {numberOfGames}
        </div>
      </div>
      <div>
        <div>
          Total Amount Funded:
        </div>
        <div>
          <EthIcon 
            amount={fundingData}
          />
        </div>
      </div>
    </div>
  );
}

export default UserInfo;