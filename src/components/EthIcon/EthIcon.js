import React from 'react';
import './EthIcon.css';

const EthIcon = props => {
  const {
    amount
  } = props

  return (
    <div>
      <div className="eth-icon-display">
        <div>{amount}</div>
        <div className="eth-icon"></div>
      </div>
    </div>
  );
}
export default EthIcon;