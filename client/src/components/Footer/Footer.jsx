import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { scrollToTop } from "../../client.js";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa6";

// 4 columns in footer, main, features, other
const Footer = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="footer-container">
      {/* ALL FOOTER COLUMNS  */}
      <div className="footer-links flex">
        {/* SINGULAR FOOTER COLUMN */}
        <div className="footer-column flex">
          <h3>Main</h3>
          <p onClick={() => navigate("/")}>Home</p>
          {user && (
            <p onClick={() => navigate(`/account/${user.username}`)}>Account</p>
          )}
          <p onClick={scrollToTop}>Upscale</p>
          <p>
            {" "}
            <a
              style={{ color: "inherit", textDecoration: "none" }}
              href="mailto:refiinedaii@gmail.com"
            >
              Support{" "}
            </a>
          </p>
          <p onClick={() => navigate("/pricing")}>Pricing</p>
        </div>

        {/* SINGULAR FOOTER COLUMN */}
        <div className="footer-column flex">
          <h3>Features</h3>
          <p onClick={() => navigate("/features/1")}>Real-ESRGAN</p>
          <p onClick={() => navigate("/features/2")}>Enhanced and Enlarged</p>
          <p onClick={() => navigate("/features/3")}>Efficient Upscaling</p>
          <p onClick={() => navigate("/features/4")}>High Resolution Output</p>
          <p onClick={() => navigate("/features/5")}>Detail Refinement</p>
          <p onClick={() => navigate("/features/6")}>Compatability</p>
        </div>

        {/* SINGULAR FOOTER COLUMN */}
        <div className="footer-column flex">
          <h3>Other</h3>
          <p onClick={() => navigate("/collection")}>View Collection</p>
          <p onClick={() => navigate("/reviews")}>View Reviews</p>
          <p>Email List</p>
        </div>

        {/* SINGULAR FOOTER COLUMN */}
        <div className="footer-column flex">
          <div className="logo flex">
            <img src={logo} alt="" />
            <h1>RefinedAI</h1>
          </div>

          <div className="socials flex">
            <a
              target="_blank"
              className="flex"
              href="https://twitter.com/RefinedAi"
            >
              <BsTwitter />
            </a>
            <a
              target="_blank"
              className="flex"
              href="https://www.instagram.com/refinedai/"
            >
              <AiFillInstagram />
            </a>

            <a
              target="_blank"
              className="flex"
              href="https://www.tiktok.com/@refinedai"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <p className="grey-text rights">@2023 RefinedAI, All Right Reserved</p>
    </div>
  );
};

export default Footer;
