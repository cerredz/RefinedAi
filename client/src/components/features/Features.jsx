import React from "react";
import "./Features.css";
import { spanNames, featuresData } from "./data";
import { BsArrowRight } from "react-icons/bs";
const Features = (props) => {
  return (
    <div id="features" className="features-container">
      {spanNames.map((span, index) => (
        <span className={`${span.classname}`}></span>
      ))}

      {/* HEADING / SUBHEADING*/}
      <div className="features-heading">
        <span className="heading">Our Features</span>

        <p className="grey-text">
          Learn More About What You Are Getting When Using RefinedAi to Upscale
          and Enhance Your Images
        </p>
      </div>

      {/* FEATURES CARD */}
      <div className="features-content flex">
        {featuresData.map((feature, index) => (
          <div className={`feature ${feature.classname}`}>
            <span className="top-glow"></span>
            <span className="bottom-glow"></span>
            <span className="span-3"></span>
            <div className="feature-header">
              <h3>{feature.heading}</h3>
            </div>

            <div className="feature-text">
              <p className="grey-text">{feature.subheading}</p>
              {feature.readMore ? (
                <button className="btn-read-more flex">
                  Read More <BsArrowRight />
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
