import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import web3 from '../../services/SmartContract/web3';
import './GameRenderer.css';

class GameRenderer extends Component {
    constructor(props){
        super(props)
        this.state = {
            index: "index.html",
            ipfsHash: this.props.location.state.gameHash,
            gameOwner: this.props.location.state.gameOwner,
            description: this.props.location.state.description,
            url: "https://ipfs.infura.io/ipfs/",
        }
    }

    componentDidMount = function () {
        console.log(this.props)
        if(!this.state.ipfsHash){
        }
    }

    tipUploader = async (event) => {
        event.preventDefault()
        // web3.send eth function
        let accounts = await web3.eth.getAccounts();
        let tip = 100000000000000000;
        web3.eth.sendTransaction({
            to: this.state.gameOwner,
            from: accounts[0],
            value: tip
        }, (err, data) => {
            console.log(data)
        });
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