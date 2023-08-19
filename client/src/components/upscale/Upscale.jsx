import React, { useState, useEffect } from "react";
import img1 from "../assets/8k1.jpg";
import img2 from "../assets/8k2.jpg";
import img3 from "../assets/8k3.jpg";
import img4 from "../assets/8k4.jpg";
import img5 from "../assets/8k5.jpg";
import img6 from "../assets/8k6.jpg";
import img7 from "../assets/8k7.jpg";
import img8 from "../assets/8k8.jpg";
import img9 from "../assets/8k9.jpg";
import { BsBoxArrowInUpLeft } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import FileUploader from "../FileUploader/FileUploader";
import "./Upscale.css";

const imageUrls = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const Upscale = (props) => {
  const [expandImage, setExpandImage] = useState("");
  return (
    <div id="upscale" className="upscale-container">
      <div className="upscale-content flex">
        <div className="upscale-header flex">
          <h1>
            <span className="upscale-text">Upscale</span> Your Images To The
            Next Level
          </h1>
          <p className="grey-text">
            Use Revolutionizing AI Technology to Make Your Pictures Crystal
            Clear
          </p>

          <div className="upscale-upload flex">
            <FileUploader />
          </div>
          <p className="grey-text">* Accepted Files are .pdf, .jpg, .jpeg *</p>
        </div>

        <div className="upscale-images">
          {imageUrls.map((imgUrl, index) => (
            <>
              <div
                className={`image-container ${
                  expandImage === imgUrl ? "hide" : ""
                }`}
              >
                <img key={index} src={imgUrl} alt="4k"></img>
                <BsBoxArrowInUpLeft onClick={() => setExpandImage(imgUrl)} />
              </div>

              {expandImage === imgUrl && (
                <div className="expanded-image-container">
                  <img key={index} src={imgUrl} alt="4k"></img>
                  <GrClose onClick={() => setExpandImage("")} />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upscale;
