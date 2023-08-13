import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { PiDotsNineLight } from "react-icons/pi";
import { AiOutlineClose, AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";

const Navbar = (props) => {
  const [toggleNavbarOn, setToggleNavbarOn] = useState(false);
  const user = useSelector((state) => state.auth.user);
  return (
    <nav className="navbar-container flex-between">
      {/* NAVBAR*/}
      <div className="logo-container flex">
        <img className="logo" src={logo} alt="" />
        <h1 className="logo-text">RefinedAI</h1>
      </div>

      <div className="nav-headings flex-between">
        <div className="links">
          <ul className="flex">
            <li>
              Features<span></span>
            </li>
            <li>
              Pricing<span></span>
            </li>
            <li>
              Upscale<span></span>
            </li>
            <li>
              Support<span></span>
            </li>
          </ul>
        </div>

        {/* SIGN-IN-BUTTON*/}
        <div className="sign-in-container">
          {user == null && (
            <button className="flex ">
              <p>Sign In</p>
              <FaArrowRight />
            </button>
          )}
        </div>
      </div>

      <div className="toggle-container">
        {!toggleNavbarOn && (
          <PiDotsNineLight
            onClick={() => {
              setToggleNavbarOn((prev) => !prev);
            }}
          />
        )}
      </div>

      {/* Full Navbar Display for mobile screens*/}
      {toggleNavbarOn && (
        <div className="fullscreenNavContainer ">
          <div className="heading-container flex-between">
            <div className="logo-container flex">
              <img className="logo" src={logo} alt="" />
              <h1 className="logo-text">RefinedAI</h1>
            </div>

            <div className="toggle-container">
              <AiOutlineClose
                onClick={() => {
                  setToggleNavbarOn((prev) => !prev);
                }}
              />
            </div>
          </div>

          <div className="links-container">
            <ul>
              <li>Features</li>
              <li>Pricing</li>
              <li>Upscale</li>
              <li>Support</li>
              <li>Login</li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
