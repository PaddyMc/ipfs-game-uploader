import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './GameRenderer.css';

class GameRenderer extends Component {
    constructor(props){
        super(props)
        console.log(this.props.location.state)
        this.state = {
            index: "index.html",
            ipfsHash: this.props.location.state.gameHash,
            gameOwner: this.props.location.state.gameOwner,
            description: this.props.location.state.description,
            url: "https://ipfs.infura.io/ipfs/",
        }
    }

    tipUploader = (event) => {
        // web3.send eth function
        event.preventDefault()
        console.log("Money")
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
                            Tip Uploader
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