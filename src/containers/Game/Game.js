import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import Header from '../../components/Header/Header';
import GameLoader from '../../components/GameLoader/GameLoader';
import { Types } from '@requestnetwork/request-network.js';
import Helmet from 'react-helmet';

import web3 from '../../services/contract-utils/web3';
import ipfs from '../../services/ipfs';
import gametracker from '../../services/contract-utils/gametracker';
import requestNetwork from '../../services/requestnetwork';

import './Game.css';

class Game extends Component {
  state = {
    intro: "Games",
    welcomeText: "Select a location and play a game",
    gameloader: false,
    numberOfGames: 1,
    allGames: [],
    loaded: false
  };

  componentWillMount = () => {
    this.getTotalHashes()
  }

  hideGameLoader = (event) => {
    if(event){
      this.setState({gameloader : true})
    }
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
      if(error) { console.log(error) }
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

  // Game Renderer
  getAmountFunded = async (number) => {
    const [accounts] = await web3.eth.getAccounts();
    return gametracker.methods.getAccountForGame(number).call({
      from: accounts,
    });
  }

  fundUploader = async (number) => {
    const [account] = await web3.eth.getAccounts();
    gametracker.methods.fundGameOwner(number).send({
      from: account,
      value: web3.utils.toWei('0.2', "ether")
    }, (err, data) => {
      console.log(data)
    });

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
  }

  sendRequestToBuy = async (ownerAddress) => {
    const [payeeAddress] = await web3.eth.getAccounts();
    const payerAddress = ownerAddress;

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
    const data = await request.getData();
    console.log(data.payee.expectedAmount.toString());
    console.log(data.payee.balance.toString());
  }

  render() {
    return (
      <div className="shape">
        <Helmet title={this.state.intro} />
        <ReturnButton>{this.props}</ReturnButton>
        <Header 
          intro = {this.state.intro}
          welcomeText = {this.state.welcomeText}
        />
        {
          this.state.gameloader || 
            (
              <GameLoader
                numberOfGames={this.state.numberOfGames}
                allGames={this.state.allGames}

                //Renderer
                hideGameLoader={this.hideGameLoader}
                getAmountFunded={this.getAmountFunded}
                fundUploader={this.fundUploader}
                sendRequestToBuy={this.sendRequestToBuy}
              /> 
            )
        }
        {
          this.state.loaded || (<div>Loading....</div>)
        }
      </div>
    );
  }
}

export default Game;