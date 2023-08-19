import React from "react";
import "./Features.css";
const Features = () => {
  return (
    <div id="features" className="features-container">
      {/* HEADING / SUBHEADING*/}
      <div className="features-heading">
        <h1 className="heading">
          RefinedAI <span>Features</span>
        </h1>

        <p className="grey-text">
          Learn More About RefinedAi's Powerful AI Image Upscaling
        </p>
      </div>

      <div className="features-content">
        {/* Singular Feature*/}
        <div className="feature flex">
          <img src="" alt="" />
          <div className="feature-text flex">
            <h3 className="subheading">Feature Subheading #1</h3>
            <p className="grey-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
              corrupti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
