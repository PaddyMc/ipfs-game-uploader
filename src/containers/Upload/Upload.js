import React, { Component } from 'react';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import GameUploader from '../../components/GameUploader/GameUploader';
import Header from '../../components/Header/Header';
import Helmet from 'react-helmet';

import web3 from '../../services/contract-utils/web3';
import ipfs from '../../services/ipfs';
import gametracker from '../../services/contract-utils/gametracker';

import './Upload.css';

class Upload extends Component {
  state = {
    intro: "Game Uploader",
    welcomeText: "Choose folder to send to IPFS; the folder must contain a runnable index.html & description.txt",
    ipfsHash: '',
    files:[],
    ethAddress:'',
    blockNumber:'',
    transactionHash:'',
    gasUsed:'',
    txReceipt: '',
    numberOfHashes: 0 
  };

  componentWillMount = () => {
    this.getHash()
  }

  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()

    for (let file of event.target.files) {
      //console.log(file)
      let reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => this.convertToBuffer(reader, file.webkitRelativePath)   
    }
  };

  convertToBuffer = async (reader, folderPath) => {
    const buffer = await Buffer.from(reader.result);
    this.state.files.push({path : folderPath, content : buffer})
  };

  onClick = async () => {
    try {
      this.setState({blockNumber:"waiting.."});
      this.setState({gasUsed:"waiting..."});

      await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt) => {
        this.setState({txReceipt});
      }); 

      await this.setState({blockNumber: this.state.txReceipt.blockNumber});
      await this.setState({gasUsed: this.state.txReceipt.gasUsed});    
    }
    catch(error){
      console.log(error);
    }
  }

  onSubmit = async (event) => {
      event.preventDefault();
      this.uploadToIPFS(this.state.files)
  }; 

  uploadToIPFS = async (files) => {
    const accounts = await web3.eth.getAccounts();
    const ethAddress = await gametracker.options.address;
    this.setState({ethAddress});

    console.log('Sending from Metamask account: ' + accounts[0]);
    // console.log(ipfs.types)
    await ipfs.add(files, (err, ipfsHash) => {
      if (err) { throw err }
      this.setState({ ipfsHash: ipfsHash[ipfsHash.length-1].hash});

      gametracker.methods.upload(this.state.ipfsHash, web3.utils.toHex('Hope')).send({
        from: accounts[0] 
      }, (error, transactionHash) => {
        this.setState({transactionHash});
      });
    }) 
  }

  getHash = async () => {
    const accounts = await web3.eth.getAccounts();
    gametracker.methods.getNumberOfHashes().call({
      from: accounts[0] 
    }, (error, numberOfHashesEth) => {
      this.setState({numberOfHashes: numberOfHashesEth});
    });
  };

  render() { 
    return (
      <div className="shape">
        <Helmet title={this.state.intro} />
        <ReturnButton>{this.props}</ReturnButton>
        <Header 
          intro = {this.state.intro}
          welcomeText = {this.state.welcomeText}
        />
        <GameUploader 
          onSubmit={this.onSubmit}
          captureFile = {this.captureFile}
          onClick = {this.onClick}
          getHash = {this.getHash}
          numberOfHashes = {this.state.numberOfHashes}

          ipfsHash={this.state.ipfsHash}
          ethAddress={this.state.ethAddress}
          transactionHash={this.state.transactionHash}
          blockNumber={this.state.blockNumber}
          gasUsed={this.state.gasUsed}
        />
      </div>
    );
  }
}
export default Upload;