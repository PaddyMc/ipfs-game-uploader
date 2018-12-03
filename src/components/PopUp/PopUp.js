import React from "react";
import Popup from "reactjs-popup";
import './PopUp.css'

const contentStyle = {
  maxWidth: "600px",
  width: "100%",
  height: "70%",
  borderRadius: "15px 15px 15px 15px"
};

const CustomPopUp = props => (
  <Popup 
    trigger={<button className="button">{props.buttonText}</button>} 
    modal
    contentStyle={contentStyle}
  >
  {close => (
    <div className="modal-container">
      <div className="header"> {props.buttonText} </div>
      <hr />
      <props.Content
        info={props.info}
      />
      <div className="actions">
        <button
          className="button close-button"
          onClick={() => {
            close();
          }}>
          Close PopUp
        </button>
      </div>
    </div>
  )}
  </Popup>
);

export default CustomPopUp;