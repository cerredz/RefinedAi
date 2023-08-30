import React, { useState, useEffect } from "react";
import "./Account.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

/* MOBILE ICONS*/
import profileIcon from "../../components/assets/profilePicture.png";
import upscaleIcon from "../../components/assets/upscaleIcon.png";
import userImages from "../../components/assets/userImages.png";
import notiIcon from "../../components/assets/notificationsIcon.png";
import helpIcon from "../../components/assets/helpIcon.png";
import buyIcon from "../../components/assets/buyIcon.png";

/* WEB ICONS */
import { LuSettings } from "react-icons/lu";
import { BsImage } from "react-icons/bs";
import { SlMagnifierAdd } from "react-icons/sl";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";

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
          <div>
            <ul className="flex">
              <li onClick={() => navigate("/")}>Home</li>
              <li>Pricing</li>
              <li>Support</li>
              <li>Collection</li>
            </ul>
          </div>
        </div>

        <div className="account-dashboard-content">
          {/* LEFT SIDE SIDEBAR*/}
          <div className="account-sidebar">
            <span className="fill-background"></span>
            <div className="sidebar-links flex">
              <div className="flex user">
                {user.picturePath ? (
                  <img src={user.picturePath} alt="pfp"></img>
                ) : (
                  <CgProfile />
                )}
                <div className="user-username flex">
                  <p className="grey-text">Welcome Back,</p>
                  <h3>{user.username}</h3>
                </div>
              </div>
              {/* SIDE BAR LINKS */}
              {/* ACCOUNT SETTINGS */}
              <div
                onClick={() => setSelectedTab("account-settings")}
                className={`link flex ${
                  selectedTab === "account-settings" ? "active" : ""
                }`}
              >
                <LuSettings />
                <p className="grey-text">Settings</p>
                <span
                  className={`${
                    selectedTab === "account-settings" ? "active-span" : ""
                  }`}
                ></span>
              </div>

              {/* CREDITS */}
              <div
                onClick={() => setSelectedTab("credits")}
                className={`link flex ${
                  selectedTab === "credits" ? "active" : ""
                }`}
              >
                <BiMoneyWithdraw />
                <p className="grey-text">Credits</p>
                <span
                  className={`${
                    selectedTab === "credits" ? "active-span" : ""
                  }`}
                ></span>
              </div>

              {/* UPSCALER */}
              <div
                onClick={() => setSelectedTab("upscaler")}
                className={`link flex ${
                  selectedTab === "upscaler" ? "active" : ""
                }`}
              >
                <SlMagnifierAdd />
                <p className="grey-text">Upscale</p>
                <span
                  className={`${
                    selectedTab === "upscaler" ? "active-span" : ""
                  }`}
                ></span>
              </div>

              {/* ACCOUNT IMAGES */}
              <div
                onClick={() => setSelectedTab("account-images")}
                className={`link flex ${
                  selectedTab === "account-images" ? "active" : ""
                }`}
              >
                <BsImage />
                <p className="grey-text">Your Images</p>
                <span
                  className={`${
                    selectedTab === "account-images" ? "active-span" : ""
                  }`}
                ></span>
              </div>

              {/* NOTIFICATIONS */}
              <div
                onClick={() => setSelectedTab("email-list")}
                className={`link flex ${
                  selectedTab === "email-list" ? "active" : ""
                }`}
              >
                <IoNotifications />
                <p className="grey-text">Notifications</p>
                <span
                  className={`${
                    selectedTab === "email-list" ? "active-span" : ""
                  }`}
                ></span>
              </div>

              {/* SUPPORT */}
              <div
                onClick={() => setSelectedTab("support")}
                className={`link flex ${
                  selectedTab === "support" ? "active" : ""
                }`}
              >
                <MdOutlineContactSupport />
                <p className="grey-text">Support</p>
                <span
                  className={`${
                    selectedTab === "support" ? "active-span" : ""
                  }`}
                ></span>
              </div>
            </div>
          </div>

          {/* CONTENT ON THE RIGHT SIDE OF THE SIDEBAR */}
          <div className="account-dashboard">
            {selectedTab === "account-settings" && <AccountSettings />}
            {selectedTab === "credits" && <Credits />}
            {selectedTab === "upscaler" && (
              <div className="uploader-border flex">
                {" "}
                <FileUploader />
              </div>
            )}
            {selectedTab === "account-images" && <AccountImages />}
            {selectedTab === "email-list" && <EmailList />}
            {selectedTab === "support" && (
              <div className="account-support-container">
                <h1>Support</h1>
                <p className="grey-text">
                  If you have any questions please feel free to email us:{" "}
                  <a href="mailto:refiinedaii@gmail.com">
                    refiinedaii@gmail.com
                  </a>{" "}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
