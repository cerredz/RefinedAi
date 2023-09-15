import React from "react";
import "./Esrgan.css";
import { text } from "./data";
const Esrgan = (props) => {
  return (
    <div className="esrgan-container">
      <h1 className="feature-title">Real-ESRGAN</h1>

      {/* TEXT DESCRIBING THE REAL-ESRGAN UPSCALER */}
      <div className="esrgan-content">
        {text.map((paragraph, index) => (
          <div className="esrgan-paragraph">
            <h3 className="feature-subheader">{paragraph.heading}</h3>
            <p className="feature-text">{paragraph.subheading}</p>
          </div>
        ))}
      </div>
      <br />
      <p className="grey-text">
        If you still have any questions about Real-ESRGAN make sure to{" "}
        <a
          target="_blank"
          href="https://openaccess.thecvf.com/content/ICCV2021W/AIM/papers/Wang_Real-ESRGAN_Training_Real-World_Blind_Super-Resolution_With_Pure_Synthetic_Data_ICCVW_2021_paper.pdf"
        >
          click here
        </a>
      </p>
    </div>
  );
};

export default Esrgan;
