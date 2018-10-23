import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import Helmet from 'react-helmet';

import web3 from '../../services/SmartContract/web3';
import ipfs from '../../services/ipfs';
import storehash from '../../services/SmartContract/storehash';
import './Game.css';

class Game extends Component {
    state = {
        intro: "Games",
        welcomeText: "Enter a number and play a game",
        index: "index.html",
        ipfsHash: "QmY83MVojsaGQ4N66CNd1Lwj216gZweYD8xFK8NLCsdnuu",
        url: "https://ipfs.infura.io/ipfs/",
        numberOfGames: 1
    };

    componentWillMount = function () {
        this.getTotalHashes()
    }

    getFileUploaded = async (ipfsHash) => {
        try
        {
            ipfs.get(ipfsHash, function (err, files) {
              files.forEach((file) => {
                console.log(file.path)
              })
            })
        }
        catch(error){
            console.log(error);
        } 
    } 

    getGame = (event) => {
        event.preventDefault();
        let input = Number(event.currentTarget.children[0].value)
        if(input <= this.state.numberOfGames && input > 0){
            this.getGameByNumber(event.currentTarget.children[0].value-1)
        }
        else{
            console.log("Tut tut tut...")
        }
    }

    getLatestGame = () => {
        this.getGameByNumber(this.state.numberOfGames-1);
    }

    getGameByNumber = async (number) => {
        const accounts = await web3.eth.getAccounts();
        storehash.methods.getHashByNum(number).call({
          from: accounts[0] 
        }, (error, ipfsHashFromSmartContract) => {
            console.log(ipfsHashFromSmartContract);
            this.setState({ipfsHash : ipfsHashFromSmartContract})
        });
      };

    getTotalHashes = async () => {
        const accounts = await web3.eth.getAccounts();
        storehash.methods.getNumberOfHashes().call({
            from: accounts[0] 
          }, (error, numberOfHashes) => {
            this.setState({numberOfGames : numberOfHashes})
          });
    }

    ////"postbuild": "react-snap",

    render() {
        return (
            <div className="shape">
            <Helmet title={this.state.intro} />
                <ReturnButton>{this.props}</ReturnButton>
                <div className="">
                    <h1>{this.state.intro}</h1>
                </div>
               <hr/>
               <h3 className="">{this.state.welcomeText}</h3>
               <div className="game-text-element">Number of Games: {this.state.numberOfGames}</div>
               <div className="game-action-container">
                    <form className="game-action-button" onSubmit={this.getGame}>
                        <input
                            type="text"
                        />
                        <Button 
                            type="submit"> 
                            Get Game By Number 
                        </Button>
                    </form>
                    <form className="game-action-button">
                        <Button onClick = {this.getLatestGame}>
                            Get Latest Game
                        </Button>
                    </form>
                </div>
                <hr/>
               <iframe className="game" src={`${this.state.url}/${this.state.ipfsHash}/${this.state.index}`} title={this.state.welcomeText} scrolling="no" frameBorder="1" height="650px"></iframe>
            </div>
        );
    }
}

export default Game;