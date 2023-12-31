import React from "react";
import "./Features.css";
import { spanNames, featuresData } from "./data";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Features = (props) => {
  const navigate = useNavigate();
  return (
    <div id="features" className="features-container">
      {spanNames.map((span, index) => (
        <span className={`${span.classname}`}></span>
      ))}

      {/* HEADING / SUBHEADING*/}
      <div data-aos="zoom-in" className="features-heading">
        <span className="heading">Our Features</span>

        <p className="grey-text">
          Learn More About What You Are Getting When Using RefinedAi to Upscale
          and Enhance Your Images
        </p>
      </div>

      {/* FEATURES CARD */}
      <div className="features-content flex">
        {featuresData.map((feature, index) => (
          <div
            data-aos={feature.animation}
            data-aos-duration="900"
            data-aos-offset="250"
            className={`feature ${feature.classname}`}
          >
            <div className="feature-header">
              <h3>{feature.heading}</h3>
            </div>
            <div className="feature-text">
              <p className="grey-text">{feature.subheading}</p>

              {/* READ MORE BUTTON */}
              <button
                onClick={() => navigate(`/features/${feature.redirect}`)}
                className="btn-read-more flex"
              >
                Read More <BsArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
