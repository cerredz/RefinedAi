import React from "react";
import "./SmoothDarkButton.css";
const SmoothDarkButton = (props) => {
  return (
    <button onClick={props.handleClick} className="smooth-dark-button">
      {props.text}
    </button>
  );
};

export default SmoothDarkButton;
