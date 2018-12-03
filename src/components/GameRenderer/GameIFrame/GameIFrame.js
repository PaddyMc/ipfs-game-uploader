import React, { Component } from 'react';
import './GameIFrame.css';

const GameIFrame = props => {
  const {
    location
  } = props

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

export default GameIFrame;