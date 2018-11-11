import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './UploaderActions.css';

class UploaderActions extends Component {
    render() {
      return (
        <div>
          <form className="smartcontract-action-button" onSubmit={this.props.onSubmit}>
            <input 
              name = "Submit Folder"
              type = "file"
              onChange = {this.props.captureFile}
              webkitdirectory="" 
              directory=""
            />
            <Button 
              type="submit"> 
              Upload Game to IPFS
            </Button>
          </form>

          <form className="smartcontract-action-button">
            <Button onClick = {this.props.onClick}>
              Get Transaction Receipt 
            </Button>
          </form>

          <form className="smartcontract-action-button">
            <Button onClick = {this.props.getHash}>
              Get Hash 
            </Button>
            <div className="smartcontract-number-text">
              Number of Uploads: {this.props.numberOfHashes}
            </div>
          </form>
        </div>
        );
    }
}

export default UploaderActions;