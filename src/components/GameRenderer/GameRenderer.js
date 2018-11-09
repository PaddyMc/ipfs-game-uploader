import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import web3 from '../../services/SmartContract/web3';
import { Types } from '@requestnetwork/request-network.js';
import requestNetwork from '../../services/requestnetwork';
import gametracker from '../../services/SmartContract/gametracker';
import './GameRenderer.css';

class GameRenderer extends Component {
    constructor(props){
        super(props)
        if(this.props.location.state){
            this.state = {
                index: "index.html",
                number: this.props.location.state.number,
                ipfsHash: this.props.location.state.gameHash,
                gameOwner: this.props.location.state.gameOwner,
                description: this.props.location.state.description,
                //url: "http://localhost:8080/ipfs/"
                url: "https://ipfs.infura.io/ipfs/",
                accounts: [],
            }
        } else {
            this.state = {
                index: "index.html",
                number: "this.props.location.state.number",
                ipfsHash: "this.props.location.state.gameHash",
                gameOwner: "this.props.location.state.gameOwner",
                description: "this.props.location.state.description",
                //url: "http://localhost:8080/ipfs/"
                url: "https://ipfs.infura.io/ipfs/",
                accounts: [],
            }
        }
        
    }
    
    componentDidMount = () => {
        if(!this.state.ipfsHash){
            console.log("reload")
        }
    }

    getAmountFunded = async (event) => {
        event.preventDefault()
        const [accounts] = await web3.eth.getAccounts();
        //const gameAccount = await gametracker.methods.getAccountForGame(0).call()
        
        gametracker.methods.getTotalAmountFunded().call({
            from: accounts,
        }, (err, data) => {
            //console.log(err)
            console.log("Total Amount Funded", data)
        });

        gametracker.methods.getTopFunder().call({
            from: accounts,
        }, (err, data) => {
            //console.log(err)
            console.log("Top funder", data)
        });

        gametracker.methods.getNumberOfFunders().call({
            from: accounts,
        }, (err, data) => {
            //console.log(err)
            console.log("Number of Funders", data)
        });

        gametracker.methods.getAccountForGame(this.state.number-1).call({
            from: accounts,
        }, (err, data) => {
            let decodedName = web3.utils.hexToString(data[0])
            console.log(data[1])
            console.log(decodedName)
        });
    }

    fundUploader = async (event) => {
        event.preventDefault()

        const [account] = await web3.eth.getAccounts();

        // var event = gametracker.events.UpdatedBalance({from: loadedAccounts});
        // event.subscribe((err, result) => { 
        //     if (err) {
        //         console.log(err)
        //         return;
        //     }
        //     console.log(result)
        // });

        var eventETHDeposited = gametracker.events.ETHDeposited({from: account});
        eventETHDeposited.subscribe((err, result) => { 
            if (err) {
                return;
            }
            //console.log(web3.utils.toWei('0.2', "ether"))
            console.log(result)
        });

        gametracker.methods.fundGameOwner(this.state.number-1).send({
            from: account,
            value: web3.utils.toWei('0.2', "ether")
        }, (err, data) => {
            console.log(err)
            console.log(data)
        });
    }

    sendRequestToBuy = async (event) => {
        event.preventDefault()
        const [payeeAddress] = await web3.eth.getAccounts();
        const payerAddress = this.state.gameOwner;

        console.log(payeeAddress, payerAddress)

        const payerInfo = {
            idAddress: payerAddress,
            refundAddress: payerAddress,
        };

        const payeesInfo = [{
            idAddress: payeeAddress,
            paymentAddress: payeeAddress,
            expectedAmount: web3.utils.toWei('0.1', 'ether'),
        }];

        const { request } = await requestNetwork.createRequest(
            Types.Role.Payee,
            Types.Currency.ETH,
            payeesInfo,
            payerInfo,
        );
        // Pay a request
        await request.pay([web3.utils.toWei('0.1', 'ether')], [0], { from: payerAddress });
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
                    <form className="gamerenderer-button" onSubmit={this.fundUploader}>
                        <Button 
                            type="submit"> 
                            Fund Game Uploader
                        </Button>
                    </form>
                    <form className="gamerenderer-button" onSubmit={this.getAmountFunded}>
                        <Button 
                            type="submit"> 
                            Get Amount Funded
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