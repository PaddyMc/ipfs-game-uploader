import React, { Component } from 'react';
import './ReturnButton.css';

class ReturnButton extends Component {
  render() {
    return (
      <div>
        <div className="returnbutton" onClick={() => this.props.children.history.goBack()}>
          ←
        </div>
      </div>
    );
  }
}

export default ReturnButton;