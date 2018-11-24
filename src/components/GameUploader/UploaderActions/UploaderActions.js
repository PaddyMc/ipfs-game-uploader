import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import UploadForm from './UploadForm/UploadForm'
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
        captureImage
      } = this.props

      return (
        <div className="uploaderActions">
          <form className="smartcontract-action-button">
            <div className="inputText">
              <Button onClick={getHash}>
                Get Hash 
              </Button>
            </div>
            <div>
              Number of Uploads: {numberOfHashes}
            </div>
          </form>
          <UploadForm
            captureImage = {captureImage}
           />
          <form className="" onSubmit={(event) => {event.preventDefault(); onSubmit(files)}}>
            <div className="folderUploader">
              <div className="inputText">Folder:</div>
              <input
                name = "Submit Folder"
                type = "file"
                onChange = {(event) => { captureFile(event) }}
                webkitdirectory={numberOfHashes} 
                directory={numberOfHashes}
              />
            </div>
            <div className="finalUploadButtonContainer">
              <Button className="finalUploadButton"
                type="submit"> 
                Upload Game to IPFS
              </Button>
            </div>
          </form>
        </div>
        );
    }
}

export default UploaderActions;