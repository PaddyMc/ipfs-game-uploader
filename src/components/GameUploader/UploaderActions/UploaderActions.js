import React from 'react';
import { Button } from 'react-bootstrap';
import UploadForm from './UploadForm/UploadForm'
import './UploaderActions.css';

const UploaderActions = props => {
  const {
    files,
    onSubmit,
    captureFile,
    numberOfHashes,
    folderName
  } = props

  return (
    <div>
      <div className="upload-text-element">
        Number of Uploads: {numberOfHashes}
      </div>
      <hr />
      <div className="uploaderActions">
        <div className="upload-text-element"><b>Upload Form</b></div>
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
            <Button className="button"
              type="submit"> 
                Upload Game
            </Button>
          </div>
        </form>
      </div>
    </div>
    );
}

export default UploaderActions;