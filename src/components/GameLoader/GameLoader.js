import React, { Component } from 'react';
import './GameLoader.css';

import web3 from '../../services/SmartContract/web3';
import ipfs from '../../services/ipfs';
import gametracker from '../../services/SmartContract/gametracker';

import GameDetails from './GameDetails/GameDetails'

class GameLoader extends Component {
    state = {
        numberOfGames: 1,
        allGames: [],
        loaded: false
    };

    componentWillMount = () => {
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
            this.getAllInfoByPosition(accounts[0])
        });
    }

    getAllInfoByPosition = (account) => {
        let promises = []
        for(let i = 0; i < this.state.numberOfGames; i++){
            promises.push(gametracker.methods.getHashByNum(i).call({
                from: account
            }))
            promises.push(gametracker.methods.getOwnerForGame(i).call({
                from: account
            }))
        }

        Promise.all(promises).then((data) => {
            for(let i = 2; i < data.length + 1; i++){
                if(i % 2 === 0) {
                    this.state.allGames.push({
                        number : i / 2,
                        gameHash : data[i-2], 
                        gameOwner : data[i-1], 
                    })
                    this.getDescriptionData(data[i-2], i / 2)
                    //this.getImageData(data[i-2], i / 2)
                }
            }
        })
    }

    getDescriptionData = async (gameHash, position) => {
        let descriptionText = 0
        let description = this.getDescription(gameHash)
        description.then((data) => {
            descriptionText = data ?  Buffer.from(data[0].content) : "None"
        }).catch((err) => {
            console.log("err")
        }).finally(() => {
            this.state.allGames[position-1].description = descriptionText.toString()

            if(position === Number(this.state.numberOfGames)){
                this.setState({loaded: true})
            }
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.loaded ? (
                        <div>
                            <div className="game-text-element">
                                Number of Games: {this.state.numberOfGames}
                            </div>
                            <hr/>
                            <GameDetails allGames={this.state.allGames} />
                        </div>
                    ) : (<div>Loading....</div>)
                }
            </div>
        );
    }
}

export default GameLoader;