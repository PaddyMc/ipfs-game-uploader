import React, { Component } from 'react';

import './IPFSSelector.css';

class IPFSSelector extends Component {
  render() { 
    const {
      changeIPFSLocation
    } = this.props

    return (
      <div>
        <select className="options" onInputCapture={changeIPFSLocation}>
          <option className="" value="infura">Infura</option>
          <option className="" value="local">Localhost</option>
        </select>
      </div>
    );
  } 
}
export default IPFSSelector;