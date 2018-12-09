import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../../../GameUploader/UploaderActions/UploadForm/RenderField/RenderField'
import { validateFund as validate } from '../../../../actions/actions'
import'./FunderForm.css';

let FunderForm = props => {
  const {
    otherInfo,
    info
  } = props

  return (
    <div className="">
      <Field 
        label="Amount to Fund" 
        className=""
        name="fund" 
        component={renderField} 
        type="text" />
      <button
        className="button"
        onClick={()=> info(otherInfo)}
      >
        Fund Game Uploader
      </button>
    </div>
  )
}

FunderForm = reduxForm({
  form: 'fund',
  validate
})(FunderForm)

export default FunderForm