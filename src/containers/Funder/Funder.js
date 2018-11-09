import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import Helmet from 'react-helmet';
import './Funder.css';
import gametracker from '../../services/SmartContract/gametracker';
import web3 from '../../services/SmartContract/web3';

class Funder extends Component {
    state = {
        intro: "Funders",
        welcomeText: "",
        account: null,
        totalAmountFunded: "",
        topFunder: "",
        numberOfFunders: "",
    };

    componentWillMount = () => {
        this.getAmountFunded()
    }

    getAmountFunded = async (event) => {
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
            this.setState({totalAmountFunded: data[0]})
            this.setState({topFunder: data[1]})
            this.setState({numberOfFunders: data[2]})
        })
    }

    render() {
        return (
            <div className="">
                <Helmet title={this.state.intro} />
                <ReturnButton>{this.props}</ReturnButton>
                <h1 className="introText">
                    {this.state.intro}
                </h1>
                <hr/>
                <div>
                    <p>Total Amount Funded</p>
                    <div>{this.state.totalAmountFunded}</div>
                </div>
                <hr/>
                <div>
                    <p>Top Funder</p>
                    <p>Address</p>
                    <div>{this.state.topFunder[0]}</div>
                    <p>Amount</p>
                    <div>{this.state.topFunder[1]}</div>
                </div>
                <hr/>
                <div>
                    <p>Number Of Funders</p>
                    <div>{this.state.numberOfFunders}</div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default Funder;