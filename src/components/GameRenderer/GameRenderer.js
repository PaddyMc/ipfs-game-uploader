import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import web3 from '../../services/SmartContract/web3';
import { Types } from '@requestnetwork/request-network.js';
import requestNetwork from '../../services/requestnetwork';
import './GameRenderer.css';

class GameRenderer extends Component {
    constructor(props){
        super(props)
        this.state = {
            index: "index.html",
            ipfsHash: this.props.location.state.gameHash,
            gameOwner: this.props.location.state.gameOwner,
            description: this.props.location.state.description,
            //url: "http://localhost:8080/ipfs/"
            url: "https://ipfs.infura.io/ipfs/",
            accounts: [],
        }
    }

    componentDidMount = function () {
        if(!this.state.ipfsHash){
        }
        this.loadAccounts()
    }

    loadAccounts = async () => {
        let loadedAccounts = await web3.eth.getAccounts();
        this.setState({accounts:loadedAccounts})
    }

    tipUploader = async (event) => {
        event.preventDefault()
        // web3.send eth function
        const [account] = this.state.accounts;
        let tip = 100000000000000000;
        web3.eth.sendTransaction({
            to: this.state.gameOwner,
            from: account,
            value: tip
        }, (err, data) => {
            console.log(data)
        });
    }

    sendRequestToBuy = async (event) => {
        event.preventDefault()
        let tip = 100000000000000000;
        //web3.utils.toWei('1.5', 'ether')
        const [payeeAddress] = this.state.accounts;
        const payerAddress = this.state.gameOwner;

        const payerInfo = {
            idAddress: payerAddress,
            refundAddress: payerAddress,
        };
        const payeesInfo = [{
            idAddress: payeeAddress,
            paymentAddress: payeeAddress,
            expectedAmount: web3.utils.toWei('1', 'ether'),
        }];
        const { request } = await requestNetwork.createRequest(
            Types.Role.Payee,
            Types.Currency.ETH,
            payeesInfo,
            payerInfo,
        );
        // Pay a request
        await request.pay([web3.utils.toWei('1', 'ether')], [0], { from: payerAddress });
        // The balance is the same amount as the the expected amount: the request is paid
        const data = await request.getData();
        console.log(data.payee.expectedAmount.toString());
        console.log(data.payee.balance.toString());

        // const { request } = await requestNetwork.createRequest(
        //     Types.Role.Payee,
        //     Types.Currency.ETH,
        //     [{
        //         idAddress: '0xc157274276a4e59974cca11b590b9447b26a8051',
        //         paymentAddress: '0xc157274276a4e59974cca11b590b9447b26a8051',
        //         additional: 5,
        //         expectedAmount: 100,
        //     }],
        //     {
        //         idAddress: '0x014fcc05c76687456e569561ae9956c0ec0ec223',
        //         refundAddress: '0x014fcc05c76687456e569561ae9956c0ec0ec223',
        //     }
        // );
    }

    render() {
        return (
            <div className="">
                <div className="gameloader-container">
                    <div className="gameloader-infoText">Game Owner:</div>
                    <div>{this.state.gameOwner}</div>
                    <form className="gamerenderer-button" onSubmit={this.tipUploader}>
                        <Button 
                            type="submit"> 
                            Fund Game Uploader
                        </Button>
                    </form>
                    <form className="gamerenderer-button" onSubmit={this.sendRequestToBuy}>
                        <Button 
                            type="submit"> 
                            Request To Buy
                        </Button>
                    </form>
                </div>
                <div className="gameloader-container">
                    <div className="gameloader-infoText">Description:</div>
                    <div>{this.state.description}</div>
                </div>
                <iframe className="game" src={`${this.state.url}/${this.state.ipfsHash}/${this.state.index}`} title={this.state.welcomeText} scrolling="no" frameBorder="1" height="650px"></iframe>
            </div>
        );
    }
}

export default GameRenderer;