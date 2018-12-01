import React from 'react';
import { Button } from 'react-bootstrap';
import UploadForm from './UploadForm/UploadForm'
import './UploaderActions.css';

const UploaderActions = props => {
  const {
    files,
    onSubmit,
    captureFile,
    getHash,
    numberOfHashes,
    folderName
  } = props

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
        captureFile = {captureFile}
      />

      <form className="" onSubmit={(event) => {event.preventDefault(); onSubmit(files)}}>
        <div className="folderUploader">
          <div className="inputText">Folder:</div>
          <input
            name = "Submit Folder"
            type = "file"
            onChange = {(event) => { captureFile(event, "folder") }}
            webkitdirectory={folderName}
            directory={folderName}
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

export default UploaderActions;