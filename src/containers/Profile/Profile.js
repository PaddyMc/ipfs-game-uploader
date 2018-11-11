import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import UserDetails from '../../components/UserDetails/UserDetails';
import Header from '../../components/Header/Header';
import Helmet from 'react-helmet';

import gametracker from '../../services/contract-utils/gametracker';
import web3 from '../../services/contract-utils/web3';

import './Profile.css';

class Profile extends Component {
  state = {
    intro: "Profile",
    welcomeText: "",
    account: null,
    numberOfGames: 0,
    fundingData: 0,
    allGames: 0,
    gameLocations: [],
  };

  componentWillMount = () => {
    this.getNumberOfGames()
    this.getFundingData()
  }

  getNumberOfGames = async () => {
    const [account] = await web3.eth.getAccounts();
    const numberOfGames = await gametracker.methods.getTotalGamesForOwner(account).call({
      from: account
    })
    this.getGameData()
    this.setState({numberOfGames: numberOfGames})
  }

  getGameData = async () => {
    const [account] = await web3.eth.getAccounts();
    let promises = []
    for(let i = 0; i < this.state.numberOfGames; i++){
      promises.push(gametracker.methods.getIPFSHashForOwner(account, i).call({
        from: account
      }))
    }

    Promise.all(promises).then((data) => {
      this.setState({gameLocations : data})
    })
  }

  getFundingData = async () => {
    const [account] = await web3.eth.getAccounts();
    let fundingData = await gametracker.methods.getAmountFundedByAddress(account).call({
      from: account
    }) 
    this.setState({fundingData : web3.utils.fromWei(fundingData , "ether")})
  }

  render() {
    return (
      <div>
        <Helmet title={this.state.intro} />
        <ReturnButton>{this.props}</ReturnButton>
        <Header 
          intro = {this.state.intro}
          welcomeText = {this.state.welcomeText}
        />
        <UserDetails
          numberOfGames={this.state.numberOfGames}
          fundingData={this.state.fundingData}
          gameLocations={this.state.gameLocations}
        />
      </div>
    );
  }
}

export default Profile;