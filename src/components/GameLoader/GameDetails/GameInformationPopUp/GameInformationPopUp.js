import React from 'react';
import './GameInformationPopUp.css';

const GameInformationPopUp = props => {
  const {
    info
  } = props

  return (
    <div className="content-container">
      <iframe className="info-content" title="a" src={info} />
    </div>
  )
}

export default GameInformationPopUp