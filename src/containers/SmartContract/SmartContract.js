import React, { Component } from 'react';
import { Button, Grid, Form, Table, FormControl, FormGroup, Col, ControlLabel, HelpBlock, FieldGroup } from 'react-bootstrap';
import ReturnButton from '../../components/ReturnButton/ReturnButton';

import './SmartContract.css';
import web3 from '../../services/SmartContract/web3';
import ipfs from '../../services/ipfs';
import storehash from '../../services/SmartContract/storehash';

class SmartContract extends Component {
    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: ''   
    };

    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };

    convertToBuffer = async(reader) => {
      const buffer = await Buffer.from(reader.result);
      this.setState({buffer});
    };

    onClick = async () => {
        try
        {
            this.setState({blockNumber:"waiting.."});
            this.setState({gasUsed:"waiting..."});

            await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
                console.log(err,txReceipt);
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
        const accounts = await web3.eth.getAccounts();

        console.log('Sending from Metamask account: ' + accounts[0]);
        //obtain contract address from storehash.js
        const ethAddress = await storehash.options.address;
        this.setState({ethAddress});
        //await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            //console.log(err,ipfsHash);
            //ipfsHash[0].hash
            let ipfsHash = {hash : "This is the ipfs hash"}
            this.setState({ ipfsHash: ipfsHash.hash});
            
            storehash.methods.sendHash(this.state.ipfsHash).send({
              from: accounts[0] 
            }, (error, transactionHash) => {
              console.log(transactionHash);
              this.setState({transactionHash});
            });
        //}) 
    }; 
    
    onSubmitBatch = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();

      console.log('Sending from Metamask account: ' + accounts[0]);
      const ethAddress = await storehash.options.address;
      let ipfsHash = {hash : "This is the ipfs hash"}
      this.setState({ ipfsHash: ipfsHash.hash});
      this.setState({ethAddress});
      var batch = new web3.BatchRequest();
      console.log(batch.requestManager);
      batch.add(storehash.methods.sendHash(this.state.ipfsHash).send.request({from: accounts[0], gas: 400000}, (error, transactionHash) => {this.setState({transactionHash});}));
      batch.add(storehash.methods.sendHash(this.state.ipfsHash).send.request({from: accounts[0], gas: 1000}, (error, transactionHash) => {this.setState({transactionHash});}));
      batch.add(storehash.methods.sendHash(this.state.ipfsHash).send.request({from: accounts[0], gas: 300000}, (error, transactionHash) => {this.setState({transactionHash});}));
      console.log(batch.requests);
      //batch.add(storehash.methods.sendHash(this.state.ipfsHash).send({from: accounts[0], gas: 400000}));
      batch.execute();

  }; 

render() { 
  function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
    return (
      <div className="shape">
      <ReturnButton>{this.props}</ReturnButton>
        <header >
          <h1 className="introText"> Ethereum and IPFS</h1>
        </header>
        
        <hr/>
          <h3 className="introText">Choose file to send to IPFS.</h3>
          <div className="marginLeft">
          <form onSubmit={this.onSubmit}>
            {/* <Form horizontal>
              <FormGroup controlId="formControlsFile">
                <Col componentClass={ControlLabel} sm={2}>
                  File
                </Col>
                <Col sm={10}>
                  <FormControl type="file" placeholder="File" help="Example block-level help text here."/>
                </Col>
              </FormGroup>
            </Form> */}
                {/* <FieldGroup
                  id="formControlsFile"
                  type="file"
                  label="File"
                  help="Choose file to send to IPFS."
                  onChange = {this.captureFile}
                /> */}
            <input 
              type = "file"
              onChange = {this.captureFile}
            />
            <Button 
              type="submit"> 
              Send it 
            </Button>
          </form>

          <form onSubmit={this.onSubmitBatch}>
            <Button 
              type="submit"> 
              Send Batch 
            </Button>
          </form>

          <hr/>
          <Button onClick = {this.onClick}> Get Transaction Receipt </Button>
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
    } //render
} //App
export default SmartContract;