import React, { Component } from 'react';
import './UserInfo.css';

class UserInfo extends Component {
    render() {
        return (
          <div>
            <div>
                <div>
                    Number of Games:
                </div>
                <div>
                    {this.props.numberOfGames}
                </div>
            </div>
            <div>
                <div>
                    Total Amount Funded:
                </div>
                <div>
                    {this.props.fundingData} Eth
                </div>
            </div>
          </div>
        );
    }
}

export default UserInfo;