import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate } from '../../../../actions/actions'
import'../UploaderActions.css';

let UploadForm = props => {
  const {
    captureFile,
    folderName,
    imageName,
    documentName,
    numberOfFiles
  } = props

  return (
    <div className="allInputsContainer">
      <Field 
        label="Name" 
        className="input"
        name="name" 
        component={renderField} 
        type="text" />
      <Field 
        label="Description" 
        className="input" 
        name="description" 
        component={renderField} 
        type="text" />
      <Field 
        label="Document"
        titleText={"Game Document:"}
        name="Document" 
        buttonText={"Upload File"}
        fileName={documentName}
        captureFile = {(event) => captureFile(event, "instructions")}
        component={renderFile} 
        type="file" />
      <Field 
        label="Image" 
        titleText={"Game Image:"}
        name="Image" 
        buttonText={"Upload Image"}
        fileName={imageName}
        captureFile = {(event) => captureFile(event, "image")}
        component={renderFile} 
        type="file" />
      <Field
        label="Folder"
        titleText={"Game Folder:"}
        name="Folder"
        buttonText={"Upload Folder"}
        fileName={numberOfFiles > 0 ? `Number of files: ${numberOfFiles}`:""}
        captureFile = {(event) => captureFile(event, "folder")}
        component={renderFile} 
        webkitdirectory={folderName}
        directory={folderName}
        type = "file"
      />
    </div>
  )
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
    <div className="inputContainer">
      <input className="input"  {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
)

const renderFile = ({
  label,
  type,
  captureFile,
  buttonText,
  titleText,
  webkitdirectory,
  directory,
  fileName,
  meta: { touched, error, warning }
}) => (
  <div className="folderUploader">
    <div className="inputText">{titleText}</div>
      <div className="imageFile">
        <div className="upload-btn-wrapper">
          <button className="button">{buttonText}</button>
          <input 
            webkitdirectory={webkitdirectory} 
            directory={directory} 
            onChange={captureFile} 
            className="input" 
            placeholder={label} 
            type={type} />
        </div>
      </div>
      <div>
        <div className="fileText">{fileName}</div>
      </div>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
  </div>
)

UploadForm = reduxForm({
  form: 'contact',
  validate
})(UploadForm)

export default UploadForm