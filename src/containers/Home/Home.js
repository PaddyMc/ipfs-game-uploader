import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import Header from '../../components/Header/Header';
import Helmet from 'react-helmet';
import web3 from '../../services/contract-utils/web3';
import './Home.css';

class Game extends Component {
  state = {
    intro: "Home",
    welcomeText: "Welcome, upload games, get FUNding",
    account: null
  };

  loadAccounts = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]})
  }

  componentWillMount = () => {
    this.loadAccounts()
  }

  renderContent = () => {
    return this.state.account ? this.state.account : "Install Metamask, Use Rinkbey"
  }

  render() {
    return (
      <div className="shape">
        <Helmet title={this.state.intro} />
        <ReturnButton>{this.props}</ReturnButton>
        <Header 
          intro = {this.state.intro}
          welcomeText = {this.state.welcomeText}
        />
        <h3 className="errorText">
          {this.renderContent()}
        </h3>
      </div>
    );
  }
}

export default Game;