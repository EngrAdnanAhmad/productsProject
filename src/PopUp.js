import React from "react";

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="btn-danger close-icon" onClick={props.handleClose}>
          X
        </span>
        {props.content}
        {console.log("popup called...")}
      </div>
    </div>
  );
};

export default Popup;
