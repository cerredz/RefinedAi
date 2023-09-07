import React, { useEffect } from "react";
import "./CreditsAdvert.css";
import space from "../assets/creditsAdvert.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreditsAdvert = () => {
  const navigate = useNavigate("");
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="credits-advert-container">
      <div className="credit-advert-content flex">
        <div className="img-container flex">
          <img src={space} alt="credit-advert" />
          <span className="glow"></span>
        </div>

        <div className="credit-advert-text flex">
          <div className="credit-advert-heading flex">
            <h1 className="header">
              Unlock Enahanced Images with <span>Credits</span>
            </h1>
            <p className="grey-text">
              Buying credits give you the ability to upscale an abundance of
              images all your favorite images. Achieve superior image
              enhancement with the help of credits
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
