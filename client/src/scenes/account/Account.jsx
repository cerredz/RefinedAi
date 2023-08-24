import React, { useState, useEffect } from "react";
import "./Account.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import profileIcon from "../../components/assets/profilePicture.png";
import upscaleIcon from "../../components/assets/upscaleIcon.png";
import userImages from "../../components/assets/userImages.png";
import notiIcon from "../../components/assets/notificationsIcon.png";
import helpIcon from "../../components/assets/helpIcon.png";
import buyIcon from "../../components/assets/buyIcon.png";
import {
  AccountSettings,
  FileUploader,
  AccountImages,
  EmailList,
  Credits,
} from "../../components/components";
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
  const dispatch = useDispatch();

  return (
    <div className="account-container">
      {/* MOBILE DESIGN */}
      <div className="account-mobile-content">
        <div className="user-info-heading flex">
          {user && user.picturePath === "" ? (
            ""
          ) : (
            <img src={user.picturePath} alt="" />
          )}
          <h1>{user.username}</h1>
        </div>

        <div className="mobile-nav-links flex">
          <div
            onClick={() => setSelectedTab("account-settings")}
            className="nav-link flex"
          >
            <img src={profileIcon} alt="" />
          </div>
          <div
            onClick={() => setSelectedTab("upscaler")}
            className="nav-link flex"
          >
            <img src={upscaleIcon} alt="" />
          </div>
          <div
            onClick={() => setSelectedTab("account-images")}
            className="nav-link flex"
          >
            <img src={userImages} alt="" />
          </div>
          <div
            onClick={() => setSelectedTab("email-list")}
            className="nav-link flex"
          >
            <img src={notiIcon} alt="" />
          </div>
          <div
            onClick={() => setSelectedTab("support")}
            className="nav-link flex"
          >
            <img src={helpIcon} alt="" />
          </div>
          <div
            onClick={() => setSelectedTab("credits")}
            className="nav-link flex"
          >
            <img src={buyIcon} alt="" />
          </div>
        </div>
        <div className="account-mobile-section">
          {selectedTab === "account-settings" && <AccountSettings />}
          {selectedTab === "upscaler" && (
            <div className="uploader-border flex">
              {" "}
              <FileUploader />
            </div>
          )}
          {selectedTab === "account-images" && <AccountImages />}
          {selectedTab === "email-list" && <EmailList />}

          {/* SUPPORT TAB*/}
          {selectedTab === "support" && (
            <div className="account-support-container">
              <h1>Support</h1>
              <p className="grey-text">
                If you have any questions please feel free to email us:{" "}
                <a href="mailto:refiinedaii@gmail.com">refiinedaii@gmail.com</a>{" "}
              </p>
            </div>
          )}

          {selectedTab === "credits" && <Credits />}
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
