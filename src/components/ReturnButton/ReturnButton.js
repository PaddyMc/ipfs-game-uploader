import React, { Component } from 'react';
import './ReturnButton.css';

class ReturnButton extends Component {
  render() {
    const {
      children
    } = this.props
    
    return (
      <div>
        <div className="returnbutton" onClick={() => children.history.goBack()}>
          ←
        </div>
      </div>
    );
  }
}

export default ReturnButton;