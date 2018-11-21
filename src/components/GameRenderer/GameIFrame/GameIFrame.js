import React, { Component } from 'react';
import './GameIFrame.css';

class GameIFrame extends Component {
  render() {
    const {
      location
    } = this.props

    return (
      <div>
        <iframe 
          className="game" 
          src={location} 
          title="no"
          scrolling="no" 
          frameBorder="1" 
          height="650px">
        </iframe>
      </div>
    );
  }
}

export default GameIFrame;