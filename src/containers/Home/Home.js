import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import web3 from '../../services/SmartContract/web3';
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
        console.log(this.state.account)
    }

    componentDidMount = function () {
        this.loadAccounts()
    }

    renderContent = function () {
        if(this.state.account) {
            return this.state.account
        } else {
            return "Install Metamask, Use Rinkbey"
        }
    }

    render() {
        return (
            <div className="shape">
            <ReturnButton>{this.props}</ReturnButton>
               <h1 className="introText">{this.state.intro}</h1>
               <h2 className="introText">{this.state.welcomeText}</h2>
               <h2 className="errorText">{this.renderContent()}</h2>
            </div>
        );
    }
}

export default Game;