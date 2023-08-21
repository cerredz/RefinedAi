import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { PiDotsNineLight } from "react-icons/pi";
import { AiOutlineClose, AiOutlineArrowRight } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { setLogout } from "../../state";

const Navbar = (props) => {
  const [toggleNavbarOn, setToggleNavbarOn] = useState(false);
  const [isHoveringUser, setIsHoveringUser] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* SIGN OUT USER */
  const handleSignOut = () => {
    dispatch(setLogout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {}, []);
  return (
    <nav className="navbar-container flex-between">
      {/* NAVBAR*/}
      <div onClick={() => navigate("/")} className="logo-container flex">
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
            <li onClick={() => navigate("/support")}>
              Support<span></span>
            </li>

            <li>Collection</li>
          </ul>
        </div>

        {/* SIGN-IN-BUTTON*/}
        <div className="sign-in-container">
          {user == null && (
            <button className="flex " onClick={() => navigate("/login")}>
              <p>Sign In</p>
              <FaArrowRight />
            </button>
          )}

          {user != null && (
            <>
              <div
                className="profile-picture"
                onMouseOver={() => setIsHoveringUser(true)}
                onMouseLeave={() => setIsHoveringUser(false)}
              >
                {user.picturePath === "" ? (
                  <>
                    <CgProfile />
                  </>
                ) : (
                  <>
                    <img
                      className="user-pfp"
                      src={user.picturePath}
                      alt="User Profile"
                    />
                  </>
                )}

                {isHoveringUser && (
                  <div className="profile-tab">
                    {/* HOVERING PROFILE PICTURE*/}
                    <span className="connector"></span>
                    <div className="profile-links">
                      <ul>
                        <li
                          onClick={() => navigate(`/account/${user.username}`)}
                          className="center-outwards-hover grey-text"
                        >
                          Account
                        </li>
                        <li
                          className="center-outwards-hover grey-text"
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </>
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
              <li onClick={() => navigate("/support")}>Support</li>
              <li onClick={() => navigate("/reviews")}>Reviews</li>
              {user == null ? (
                <li onClick={() => navigate("/login")}>Login</li>
              ) : (
                <li onClick={() => navigate(`/account/${user.username}`)}>
                  Account
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
