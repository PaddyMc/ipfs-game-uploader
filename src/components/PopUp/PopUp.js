import React from "react";
import Popup from "reactjs-popup";
import './PopUp.css'

const contentStyle = {
  maxWidth: "600px",
  width: "100%",
  height: "70%",
  borderRadius: "15px 15px 15px 15px"
};

const CustomPopUp = props => {
  const {
    buttonText,
    info,
    Content
  } = props
  
  return (
    <Popup 
      trigger={<button className="button">{buttonText}</button>} 
      modal
      contentStyle={contentStyle}
    >
    {close => (
      <div className="modal-container">
        <div className="header"> {buttonText} </div>
        <hr />
        <Content
          info={info}
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
};

export default CustomPopUp;