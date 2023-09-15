import React from "react";
import "./Esrgan.css";
import { text } from "./data";
const Esrgan = (props) => {
  return (
    <div className="esrgan-container">
      <h1 className="header">Real-ESRGAN</h1>

      {/* TEXT DESCRIBING THE REAL-ESRGAN UPSCALER */}
      <div className="esrgan-content">
        {text.map((paragraph, index) => (
          <div className="esrgan-paragraph">
            <h3 className="subheader">{paragraph.heading}</h3>
            <p className="text">{paragraph.subheading}</p>
          </div>
        ))}
      </div>
      <br />
      <p className="grey-text">
        If you still have any questions about Real-ESRGAN make sure to{" "}
        <a href="">click here</a>
      </p>
    </div>
  );
};

export default Esrgan;
