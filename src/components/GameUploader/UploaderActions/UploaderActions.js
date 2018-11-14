import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './UploaderActions.css';

class UploaderActions extends Component {
    render() {
      const {
        files,
        onSubmit,
        captureFile,
        getHash,
        numberOfHashes,
        resetValuesUI,
      } = this.props

      return (
        <div>
          <form className="smartcontract-action-button" onSubmit={(event) => {event.preventDefault();onSubmit(files)}}>
            <input 
              name = "Submit Folder"
              type = "file"
              onChange = {(event) => {resetValuesUI();captureFile(event)}}
              webkitdirectory="" 
              directory=""
            />
            <Button 
              type="submit"> 
              Upload Game to IPFS
            </Button>
          </form>

          <form className="smartcontract-action-button">
            <Button onClick = {getHash}>
              Get Hash 
            </Button>
            <div className="smartcontract-number-text">
              Number of Uploads: {numberOfHashes}
            </div>
          </form>
        </div>
        );
    }
}

export default UploaderActions;