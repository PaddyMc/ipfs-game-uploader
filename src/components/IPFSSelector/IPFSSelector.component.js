import React, { Component } from 'react';

import './IPFSSelector.css';

class IPFSSelector extends Component {
  render() { 
    const {
      changeIPFSLocation
    } = this.props

    return (
      <div className="diplayInline">
        <div className="ipfsLocationText">IPFS:</div>
        <select className="options" onInputCapture={changeIPFSLocation}>
          <option className="" value="infura">ipfs.infura.io</option>
          <option className="" value="local">localhost</option>
        </select>
      </div>
    );
  } 
}
export default IPFSSelector;