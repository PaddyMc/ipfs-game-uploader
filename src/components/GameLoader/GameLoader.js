import React, { Component } from 'react';
import './GameLoader.css';
import { Link } from 'react-router-dom';

import web3 from '../../services/SmartContract/web3';
import ipfs from '../../services/ipfs';
import gametracker from '../../services/SmartContract/gametracker';

class GameLoader extends Component {
    state = {
        numberOfGames: 1,
        allGames: [],
        loaded: false
    };

    componentWillMount = function () {
        this.getTotalHashes()
    }

    getFileUploaded = async (ipfsHash) => {
        return ipfs.get(ipfsHash)
    } 

    getDescription = async (ipfsHash) => {
        var description = `${ipfsHash}/description.txt`
        return this.getFileUploaded(description);
    }

    getImage = async (ipfsHash) => {
        var image = `${ipfsHash}/image.png`
        return this.getFileUploaded(image);
    }

    getTotalHashes = async () => {
        const accounts = await web3.eth.getAccounts();
        gametracker.methods.getNumberOfHashes().call({
            from: accounts[0] 
          }, (error, numberOfHashes) => {
            this.setState({numberOfGames : numberOfHashes})
            this.getAllHashes(accounts[0])
            this.getAllInfoByPosition(accounts[0])
          });
    }

    getAllHashes = async (account) => {
        for(let i = 0; i < this.state.numberOfGames; i++){
            let gameHash;
            gametracker.methods.getHashByNum(i).call({
                from: account
            }, (error, ipfsHashFromSmartContract) => {
                gameHash = ipfsHashFromSmartContract
                this.getOwnerForGame(account, i, gameHash)
            });
        }
    }

    getOwnerForGame = async (account, position, gameHash) => {
        let descriptionText = 0
        gametracker.methods.getOwnerForGame(position).call({
            from: account 
        }, (error, gameOwner) => {
            let description = this.getDescription(gameHash)
            description.then((data) => {
                descriptionText = data ?  Buffer.from(data[0].content) : 0
            }).catch(() => {
                
            }).finally(() => {
                this.state.allGames.push({
                    gameHash : gameHash, 
                    gameOwner : gameOwner, 
                    description : descriptionText.toString()
                })
                if(this.state.allGames.length == this.state.numberOfGames){
                    this.setState({loaded: true})
                }
            })
        });
    }

    getAllInfoByPosition = (account) => {
        // ToDo: Use promises.all to batch calls

        let promises = []
        for(let i = 0; i < this.state.numberOfGames; i++){
            promises.push(gametracker.methods.getHashByNum(i).call({from: account}))
            promises.push(gametracker.methods.getOwnerForGame(i).call({from: account}))
        }

        Promise.all(promises).then((data) => {
            console.log(data)
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.loaded ? (
                        <div>
                            <div className="game-text-element">Number of Games: {this.state.numberOfGames}</div>
                            
                            <hr/>
                            <div>
                            {
                                this.state.allGames.map((game, index) => {
                                    let output = 
                                    <div key={index}>
                                        <div className="gameloader-container">
                                            <div className="gameloader-infoText">Location:</div>
                                            <Link to={ { pathname: `${'game'}/${game.gameHash}`, state: game } }>{game.gameHash}</Link>
                                        </div>
                                        <div className="gameloader-container">
                                            <div className="gameloader-infoText">Owner:</div>
                                            <div>{game.gameOwner}</div>
                                        </div>
                                        <div className="gameloader-container">
                                            <div className="gameloader-infoText">Description:</div>
                                            <div>{game.description}</div>
                                        </div>
                                        <hr/>
                                    </div>
                                    return output
                                })
                            }
                            </div>
                        </div>
                    ) : (<div>Loading....</div>)
                }
            </div>
        );
    }
}

export default GameLoader;