import React, { useState } from "react";
import "./AccountSettings.css";
import { useSelector } from "react-redux/";
import passwordIcons from "../assets/password.png";
import Axios from "axios";
const AccountSettings = () => {
  const user = useSelector((state) => state.auth.user);

  /* VARIABLES FOR USER CHANGING PASSWORD */
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRetypePassword, setNewRetypePassword] = useState("");
  const [errors, setErrors] = useState({});

  /* USER SUBMITTED A CHANGE PASSWORD REQUEST*/
  const handleConfirmClick = async () => {
    if (currentPassword.length === 0) {
      //user did not enter their current password
      setErrors({
        current: true,
      });

      setTimeout(() => {
        setErrors({});
      }, 3000);
      return;
    }

    if (newPassword.length < 6) {
      //user did not enter long enough password
      setErrors({
        password: true,
      });

      setTimeout(() => {
        setErrors({});
      }, 3000);
      return;
    }
    if (newPassword !== newRetypePassword) {
      //user did not enter same new password
      setErrors({
        retype: true,
      });

      setTimeout(() => {
        setErrors({});
      }, 3000);
      return;
    }

    /* NO ERRORS SO FAR, ATTEMPT TO CHANGE PASSWORD*/
    const changePassword = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/changePassword`,
      {
        userID: user._id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      }
    );
  };
  return (
    <div className="account-settings-container">
      {/* ACCOUNT SETTINGS PAGE*/}
      <h1 className="title">Account Settings</h1>
      {/*  SECTION #1 */}
      <div className="basic-info">
        <h3 className="header">Basic Info </h3>
        <div className="basic-info-content flex">
          <div className="row flex image">
            <p className="info-name">Profile Picture </p>
            <img src={user.picturePath} alt="" />
          </div>
          <div className="row flex">
            <p className="info-name">First Name </p>
            <p>{user.firstName}</p>
          </div>
          <div className="row flex">
            <p className="info-name">Last Name </p>
            <p>{user.lastName}</p>
          </div>
        </div>
      </div>
      {/*  SECTION #2 */}
      <div className="account-info">
        <h3 className="header">Account Info: </h3>
        <div className="account-info-content flex">
          <div className="row flex">
            <p className="info-name">Credits </p>
            <p>{user.credits}</p>
          </div>
          <div className="row flex">
            <p className="info-name">Images Upscaled </p>
            <p>{user.images.length}</p>
          </div>
          <div className="row flex">
            <p className="info-name">Username </p>
            <p>{user.username}</p>
          </div>
          <div className="row flex password">
            <p className="info-name">Password </p>
            <div className="password-container flex">
              <img src={passwordIcons} alt="" />
              <img src={passwordIcons} alt="" />
              <img src={passwordIcons} alt="" />
              <img src={passwordIcons} alt="" />
              <img src={passwordIcons} alt="" />
              <img src={passwordIcons} alt="" />
              <img src={passwordIcons} alt="" />
              <img src={passwordIcons} alt="" />
            </div>
          </div>
          <div className="row flex change-password">
            <button onClick={() => setIsChangingPassword(true)}>
              Change Password
            </button>
          </div>
        </div>
        {isChangingPassword && (
          <div className="changing-passwords-container">
            <div className="changing-passwords-content flex">
              <input
                type="password"
                placeholder="Current Password"
                onChange={(event) => setCurrentPassword(event.target.value)}
                value={currentPassword}
              />
              {errors.current && <p className="error">Invalid Password</p>}
              <input
                type="password"
                placeholder="New Password"
                onChange={(event) => setNewPassword(event.target.value)}
                value={newPassword}
              />
              {errors.password && (
                <p className="error">Minimum Password Length: 6</p>
              )}
              <input
                type="password"
                placeholder="Retype New Password"
                onChange={(event) => setNewRetypePassword(event.target.value)}
                value={newRetypePassword}
              />
              {errors.retype && <p className="error">Passwords Do Not Match</p>}

              <div className="btn-container flex">
                <button className="confirm" onClick={handleConfirmClick}>
                  Confirm
                </button>
                <button className="cancel">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
