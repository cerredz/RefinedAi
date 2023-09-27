import React, { useEffect } from "react";
import "./CreditsAdvert.css";
import space from "../assets/creditAdvert.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { companiesData } from "./data";
import { PinkParticles, BlueParticles } from "./Particles";

const CreditsAdvert = () => {
  const navigate = useNavigate("");
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="credits-advert-container">
      <div className="credits-advert-companies flex">
        {/* COMPANIES THAT USE / DEVELOPE AI IMAGE UPSCALING */}
        {companiesData.map((company, index) => (
          <div
            data-aos={company.animation}
            className={`company-card flex ${company.classname}`}
            key={index}
          >
            <img src={company.icon} alt="" />
            <p className="grey-text"> {company.company}</p>
          </div>
        ))}
      </div>
      <div className="credit-advert-content flex">
        <div data-aos="fade-right" className="img-container flex">
          <img src={space} alt="credit-advert" />
          <span className="glow"></span>
          <PinkParticles />
          <BlueParticles />
        </div>

        <div
          data-aos="fade-left"
          data-aos-offset="300"
          className="credit-advert-text flex"
        >
          <span className="blob blob1"></span>

          <div className="credit-advert-heading flex">
            <h1 className="header">
              Unlock Upscaled Images With <span>Credits</span>
            </h1>
            <p className="grey-text">
              Buying credits give you the ability to upscale more images. Click
              below to achieve world class image upscaling with the help of
              credits
            </p>
          </div>

          <div className="credit-advert-buttons flex">
            <button onClick={() => navigate("/credits")} className="explore">
              Explore <span className="glow"></span>
            </button>
            <button
              onClick={() => navigate(`/account/${user.username}`)}
              className="view flex"
            >
              <p> View your credits</p>
              <FaLongArrowAltRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsAdvert;
