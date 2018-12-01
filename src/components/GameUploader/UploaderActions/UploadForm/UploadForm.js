import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate } from '../../../../actions/actions'
import'../UploaderActions.css';

let UploadForm = props => {
  const {
    captureFile
  } = props

  return (
    <div className="allInputsContainer">
      <Field label="Name" className="input" name="name" component={renderField} type="text" />
      <Field label="Description" className="input" name="description" component={renderField} type="text" />
      <div className="folderUploader">
        <div className="inputText">Intro Document:</div>
        <Field 
          label="Document" 
          classNameOuter="imageFile" 
          name="Document" 
          captureImage = {(event) => captureFile(event, "instructions")}
          component={renderFile} 
          type="file" />
      </div>
      <div className="folderUploader">
        <div className="inputText">Image:</div>
        <Field 
          label="Image" 
          classNameOuter="imageFile" 
          name="Image" 
          captureImage = {(event) => captureFile(event, "image")}
          component={renderFile} 
          type="file" />
      </div>
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
  input,
  label,
  type,
  captureImage,
  classNameOuter,
  classNameInner,
  meta: { touched, error, warning }
}) => (
    <div className={classNameOuter}>
      <input onChange = {captureImage} className="input" placeholder={label} type={type} />
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