import React, { useState, useEffect } from "react";
import "./Account.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import profileIcon from "../../components/assets/profilePicture.png";
import upscaleIcon from "../../components/assets/upscaleIcon.png";
import userImages from "../../components/assets/userImages.png";
import notiIcon from "../../components/assets/notificationsIcon.png";
import helpIcon from "../../components/assets/helpIcon.png";
import buyIcon from "../../components/assets/buyIcon.png";
import { AccountSettings } from "../../components/components";

const Account = () => {
  /* ACCOUNT TABS: 
        - account (basic information)
        - upscale (full screen)
        - my images (all upscaled images upscaled by user)
        - notifications (email list)
        - help (support information)
        - Buy Credits ()
        
    */

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("account-settings");

  return (
    <div className="account-container">
      {/* MOBILE DESIGN */}
      <div className="account-mobile-content">
        <div className="user-info-heading flex">
          {user.picturePath === "" ? "" : <img src={user.picturePath} alt="" />}
          <h1>{user.username}</h1>
        </div>

        <div className="mobile-nav-links flex">
          <div className="nav-link flex">
            <img src={profileIcon} alt="" />
          </div>
          <div className="nav-link flex">
            <img src={upscaleIcon} alt="" />
          </div>
          <div className="nav-link flex">
            <img src={userImages} alt="" />
          </div>
          <div className="nav-link flex">
            <img src={notiIcon} alt="" />
          </div>
          <div className="nav-link flex">
            <img src={helpIcon} alt="" />
          </div>
          <div className="nav-link flex">
            <img src={buyIcon} alt="" />
          </div>
        </div>
        <div className="account-mobile-section">
          {selectedTab === "account-settings" && <AccountSettings />}
        </div>
      </div>

      <div className="account-content">
        {/* TOP RIGHT NAVBAR*/}
        <div className="account-navbar flex">
          <ul className="flex">
            <li onClick={() => navigate("/")}>Home</li>
            <li>Pricing</li>
            <li>Support</li>
            <li>Collection</li>
            <li>
              <img src={user.picturePath} alt="" />
            </li>
          </ul>
        </div>

        {/* LEFT SIDE SIDEBAR*/}
        <div className="account-sidebar">
          <h1 className="username">{user.username}</h1>

          <div className="sidebar-links"></div>
        </div>
      </div>
    </div>
  );
};

export default Account;