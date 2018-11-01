import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import Helmet from 'react-helmet';

import './SmartContract.css';
import web3 from '../../services/SmartContract/web3';
import ipfs from '../../services/ipfs';
import gametracker from '../../services/SmartContract/gametracker';

class SmartContract extends Component {
    state = {
      intro: "Game Uploader",
      welcomeText: "Choose folder to send to IPFS; the folder must contain a runnable index.html & description.txt",
      ipfsHash: null,
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

    convertToBuffer = async(reader, folderPath) => {
      const buffer = await Buffer.from(reader.result);
      this.state.files.push({path : folderPath, content : buffer})
    };

    onClick = async () => {
        try
        {
            this.setState({blockNumber:"waiting.."});
            this.setState({gasUsed:"waiting..."});

            await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
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
    
    onSubmitBatch = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();

      console.log('Sending from Metamask account: ' + accounts[0]);
      const ethAddress = await gametracker.options.address;
      let ipfsHash = {hash : "This is the ipfs hash"}
      this.setState({ ipfsHash: ipfsHash.hash});
      this.setState({ethAddress});
      var batch = new web3.BatchRequest();
      console.log(batch.requestManager);
      batch.add(gametracker.methods.upload(this.state.ipfsHash, '0x04').send.request({from: accounts[0], gas: 400000}, (error, transactionHash) => {this.setState({transactionHash});}));
      batch.add(gametracker.methods.upload(this.state.ipfsHash, '0x04').send.request({from: accounts[0], gas: 1000}, (error, transactionHash) => {this.setState({transactionHash});}));
      batch.add(gametracker.methods.upload(this.state.ipfsHash, '0x04').send.request({from: accounts[0], gas: 300000}, (error, transactionHash) => {this.setState({transactionHash});}));
      console.log(batch.requests);
      //batch.add(gametracker.methods.sendHash(this.state.ipfsHash).send({from: accounts[0], gas: 400000}));
      batch.execute();

  }; 

render() { 
    return (
      <div className="shape">
      <Helmet title={this.state.intro} />
      <ReturnButton>{this.props}</ReturnButton>
        <header >
          <h1 className="introText">{this.state.intro}</h1>
        </header>
        
        <hr/>
          <h3 className="">{this.state.welcomeText}</h3>
          <div className="marginLeft">
          <form className="smartcontract-action-button" onSubmit={this.onSubmit}>
            <input 
              name = "Submit Folder"
              type = "file"
              onChange = {this.captureFile}
              webkitdirectory="" 
              directory=""
            />
            <Button 
              type="submit"> 
              Upload Game to IPFS
            </Button>
          </form>

          <form className="smartcontract-action-button" onSubmit={this.onSubmitBatch}>
            <Button 
              type="submit"> 
              Send Batch 
            </Button>
          </form>

          <form className="smartcontract-action-button">
            <Button onClick = {this.onClick}>
             Get Transaction Receipt 
             </Button>
          </form>

          <form className="smartcontract-action-button">
            <Button onClick = {this.getHash}>
              Get Hash 
             </Button>
             <div className="smartcontract-number-text">Number of Uploads: {this.state.numberOfHashes}</div>
          </form>

          
          <hr/>
          
          <Table striped bordered className="tableSize">
              <thead >
                <tr>
                  <th className="tableText halfSize">Tx Receipt Category</th>
                  <th className="tableText halfSize">Values</th>
                </tr>
              </thead>
              <tbody className="tableText">
                <tr>
                  <td>IPFS Hash # stored on Eth Contract</td>
                  <td>{this.state.ipfsHash}</td>
                </tr>
                <tr>
                  <td>Ethereum Contract Address</td>
                  <td>{this.state.ethAddress}</td>
                </tr>
                <tr>
                  <td>Tx Hash # </td>
                  <td>{this.state.transactionHash}</td>
                </tr>
                <tr>
                  <td>Block Number # </td>
                  <td>{this.state.blockNumber}</td>
                </tr>
                <tr>
                  <td>Gas Used</td>
                  <td>{this.state.gasUsed}</td>
                </tr>
              </tbody>
          </Table>
          </div>
    </div>
    );
    } 
}
export default SmartContract;