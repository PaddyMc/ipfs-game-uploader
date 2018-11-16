import React, { Component } from 'react';
import './UserInfo.css';

class UserInfo extends Component {
  render() {
    const {
      numberOfGames,
      fundingData
    } = this.props
    
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
          {fundingData} Eth
        </div>
      </div>
      </div>
    );
  }
}

export default UserInfo;