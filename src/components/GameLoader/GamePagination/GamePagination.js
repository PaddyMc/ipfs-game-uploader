import React from "react";

import './GamePagination.css'

const GamePagination = props => {
  const {
    changeGamePage,
    pageNumber,
    numberOfPages,
  } = props
  
  return (
    <div className="arrow-button-container">
      <div 
        className="returnbutton arrow-button" 
        onClick={() => (changeGamePage(false))}>
          ←
      </div>
      <div className="page-x-of-y-text">Page {pageNumber} of {numberOfPages}</div>
      <div 
        className="returnbutton arrow-button" 
        onClick={() => (changeGamePage(true))}>
          →
      </div>

    </div>
  );
};

export default GamePagination;