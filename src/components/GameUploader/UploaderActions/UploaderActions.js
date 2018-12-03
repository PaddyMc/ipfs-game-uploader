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
    folderName,
    imageName,
    documentName,
    numberOfFiles
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
          folderName = {folderName}
          imageName = {imageName}
          documentName = {documentName}
          numberOfFiles = {numberOfFiles}
        />
        <div className="finalUploadButtonContainer">
          <Button 
            className="button"
            onClick={() => onSubmit(files)}> 
              Submit Game
          </Button>
        </div>
      </div>
    </div>
    );
}

export default UploaderActions;