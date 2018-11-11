import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import Header from '../../components/Header/Header';
import Helmet from 'react-helmet';

import gametracker from '../../services/contract-utils/gametracker';
import web3 from '../../services/contract-utils/web3';

import './Funder.css';

import FunderDetails from '../../components/FunderDetails/FunderDetails';

class Funder extends Component {
  state = {
    intro: "Funders",
    welcomeText: "",
    totalAmountFunded: "",
    topFunder: [],
    numberOfFunders: "",
    allFunders: [],
  };

  componentWillMount = () => {
    this.getAmountFunded()
  }

  getAmountFunded = async () => {
    const [accounts] = await web3.eth.getAccounts();
    let promises = []

    promises.push(gametracker.methods.getTotalAmountFunded().call({
      from: accounts
    }))
    promises.push(gametracker.methods.getTopFunder().call({
      from: accounts
    }))
    promises.push(gametracker.methods.getNumberOfFunders().call({
      from: accounts
    }))

    Promise.all(promises).then((data) => {
      this.setState({ totalAmountFunded: data[0] })
      this.setState({ topFunder: data[1] })
      this.setState({ numberOfFunders: data[2] })
      this.getAllFunders()
    })
  }

  getAllFunders = async () => {
    const [accounts] = await web3.eth.getAccounts();
    let promises = []

    for (let i = 0; i < this.state.numberOfFunders; i++) {
      promises.push(gametracker.methods.getFunderDataByNum(i).call({
        from: accounts
      }))
    }

    Promise.all(promises).then((data) => {
      this.setState({ allFunders: data })
    })
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
        <FunderDetails 
          numberOfFunders={this.state.numberOfFunders}
          totalAmountFunded={this.state.totalAmountFunded}
          topFunder={this.state.topFunder}
          allFunders={this.state.allFunders}
        />
      </div>
    );
  }
}

export default Funder;