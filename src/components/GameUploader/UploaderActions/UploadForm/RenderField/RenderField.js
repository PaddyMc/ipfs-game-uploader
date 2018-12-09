import React from 'react'

import'../../UploaderActions.css';

export const renderField = ({
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