import React, { useState } from "react";
import "./AccountSettings.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../state";
import passwordIcons from "../assets/password.png";
import Axios from "axios";
import Dropzone from "react-dropzone";
import { CgProfile } from "react-icons/cg";

const AccountSettings = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState(null);

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
      `${process.env.REACT_APP_BACKEND_URL}/auth/changePassword`,
      {
        userID: user._id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      }
    );

    if (changePassword.data.res) {
      //password changed for user, update redux state
      localStorage.setItem("user", JSON.stringify(changePassword.data.user));
      dispatch(
        setLogin({
          user: changePassword.data.user,
          token: changePassword.data.token,
        })
      );

      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setNewRetypePassword("");
    } else {
      setErrors({ current: true });
    }
  };

  /* USER CANCELLED THEIR CHANGE PASSWORD REQUEST */
  const handleCancelClick = () => {
    setCurrentPassword("");
    setNewPassword("");
    setNewRetypePassword("");
    setIsChangingPassword(false);
  };

  /* ATTEMPTS TO CHANGE PROFILE PICTURES FOR A USER*/
  const handleChangeProfilePicture = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProfilePicture(file);

    /* Pass Picture and User Information to Backend*/
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("user", JSON.stringify(user));

    const changeProfilePicture = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/changeProfilePicture`,
      formData
    );

    const response = changeProfilePicture.data;

    if (response) {
      /* New Profile Picture Successfully Uploaded, Change User Information */
      localStorage.setItem("user", JSON.stringify(response));

      dispatch(setLogin({ user: response, token: token }));
    }
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

            <Dropzone
              acceptedFiles=".jpg, .jpeg, .png"
              multiple={false}
              onDrop={(acceptedFiles) =>
                handleChangeProfilePicture(acceptedFiles)
              }
            >
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone-container flex" {...getRootProps()}>
                  <input {...getInputProps()}></input>

                  {user && user.picturePath !== "" ? (
                    <img src={user.picturePath} alt=""></img>
                  ) : (
                    <CgProfile />
                  )}
                  <p className="grey-text">Change</p>
                </div>
              )}
            </Dropzone>
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
                <button className="cancel" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
