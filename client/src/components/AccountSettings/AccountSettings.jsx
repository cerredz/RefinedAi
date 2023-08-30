import React, { useState, useEffect } from "react";
import "./AccountSettings.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../state";
import passwordIcons from "../assets/password.png";
import Axios from "axios";

//icons
import Dropzone from "react-dropzone";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BiUser } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCardImage } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { PiNotePencilFill } from "react-icons/pi";
import { getUserReviews } from "../../client";

const AccountSettings = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState(null);
  const [reviews, setReviews] = useState([]);

  /* VARIABLES FOR USER CHANGING PASSWORD */
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRetypePassword, setNewRetypePassword] = useState("");
  const [errors, setErrors] = useState({});

  const [newFirstName, setNewFirstName] = useState(null);
  const [newLastName, setNewLastName] = useState(null);

  useEffect(() => {
    /* GET REVIEWS WRITTEN BY USER FROM THE BACKEND*/
    async function userReviews() {
      const getReviews = await getUserReviews(user._id);
      setReviews(getReviews);
    }

    userReviews();
  }, []);

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

  /* ATTEMPTS TO CHANGE PROFILE PICTURES FOR A USER */
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

  /* ATTEMPTS TO CHANGE A USER'S FIRST OR LAST NAME */
  const handleNameChange = async (name) => {
    let request = null;
    let response = null;

    /* USER INPUTTED BLANK NAME CHANGE REQUEST */
    if (name === "first" && newFirstName === "") {
      return;
    }

    if (name === "last" && newLastName === "") {
      return;
    }

    /* FOR MORE READABLE CODE, FROM HERE WE WILL UPDATE BOTH FIRST AND LAST NAME FOR THE USER */
    if (name === "first") {
      request = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/changeName`,
        { id: user._id, newFirstName: newFirstName, newLastName: user.lastName }
      );
    } else {
      request = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/changeName`,
        { id: user._id, newFirstName: user.firstName, newLastName: newLastName }
      );
    }

    response = request.data;
    dispatch(setLogin({ user: response, token: token }));
    setNewFirstName(null);
    setNewLastName(null);
    localStorage.setItem("user", JSON.stringify(response));
  };
  return (
    <div className="account-settings-container">
      {/* MOBILE FRONTEND DESIGN */}
      <div className="account-settings-mobile">
        {/* ACCOUNT SETTINGS PAGE*/}
        <h1 className="title">Account Settings</h1>
        {/*  SECTION #1 */}
        <div className="basic-info">
          <h3 className="header">Basic Info </h3>
          <div className="basic-info-content flex">
            <div className="row flex image">
              <p className="info-name">Profile Picture </p>

              {/* CHANGE PFP */}
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
                {errors.retype && (
                  <p className="error">Passwords Do Not Match</p>
                )}

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

      {/* WEB FRONTEND DESIGN */}
      <div className="account-settings-web">
        {/* LEFT SIDE OF ACCOUNT SETTINGS */}
        <div className="user-information">
          <div className="user-banner">
            <h1>Account Settings</h1>
            <p className="grey-text">
              Here you can both view and edit the information about yourself.
              Changes may require a refresh.
            </p>
          </div>

          <div className="user-information-content">
            <div className="email flex">
              <label htmlFor="">Email address</label>
              <div className="email-input input flex">
                <input type="text" value={user.email} />
                <AiOutlineMail />
              </div>
            </div>

            <div className="name">
              <div className="first-name">
                <label className="first-name-label" htmlFor="">
                  First Name
                </label>
                {/* USER FIRST AND LAST NAME */}
                <div className="first-name-input input flex">
                  {newFirstName !== null ? (
                    <>
                      <input
                        onChange={(e) => setNewFirstName(e.target.value)}
                        className="first"
                        type="text"
                        value={newFirstName}
                        autoFocus
                      />
                      <IoIosCloseCircleOutline
                        onClick={() => setNewFirstName(null)}
                      />
                    </>
                  ) : (
                    <input
                      onChange={(e) => setNewFirstName(e.target.value)}
                      className="first"
                      type="text"
                      value={user.firstName}
                    />
                  )}

                  {newFirstName !== null && (
                    <p
                      onClick={() => handleNameChange("first")}
                      className="change-name"
                    >
                      Change
                    </p>
                  )}
                </div>
              </div>

              <div className="last-name">
                <label className="last-name-label" htmlFor="">
                  Last Name
                </label>
                <div className="last-name-input input flex">
                  {newLastName !== null ? (
                    <>
                      <input
                        onChange={(e) => setNewLastName(e.target.value)}
                        className="first"
                        type="text"
                        value={newLastName}
                        autoFocus
                      />
                      <IoIosCloseCircleOutline
                        onClick={() => setNewLastName(null)}
                      />
                    </>
                  ) : (
                    <input
                      onChange={(e) => setNewLastName(e.target.value)}
                      className="first"
                      type="text"
                      value={user.lastName}
                    />
                  )}
                  {newLastName !== null && (
                    <p
                      onClick={() => handleNameChange("last")}
                      className="change-name"
                    >
                      Change
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* USER USERNAME AND PASSWORD */}
            <div className="username">
              <div className="username-column">
                <label htmlFor="">Username</label>
                <div className="username-input input flex">
                  <p>{user.username}</p>
                  <BiUser />
                </div>
              </div>
              <div className="username-column">
                <label htmlFor="">Password</label>
                <div className="password-input input flex">
                  <p>*******</p>
                  <p
                    onClick={() => setIsChangingPassword(true)}
                    className="grey-text change-password"
                  >
                    {" "}
                    Change Password
                  </p>
                </div>
              </div>
            </div>

            {/* CHANING PASSWORD CONTENT */}
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
                    onChange={(event) =>
                      setNewRetypePassword(event.target.value)
                    }
                    value={newRetypePassword}
                  />
                  {errors.retype && (
                    <p className="error">Passwords Do Not Match</p>
                  )}

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

            <div className="user-reviews">
              <h3>Reviews </h3>
              {reviews &&
                reviews.map((review, index) => (
                  <div className="review-container">
                    <p className="grey-text review-stars">
                      Rating: {review.stars}
                    </p>
                    <div key={index} className="review-description">
                      <p>{review.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* RIGHT SIDE OF ACCOUNT SETTINGS*/}
        <div className="account-stats">
          {/* CHANGE PROFILE PICTURE */}
          <h3 className="subheading">Profile Picture</h3>
          <div className="account-profile-picture flex">
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

          {/* ACCOUNT STATS */}
          <h3 className="subheading">Account Stats</h3>

          <div className="account-stats-content ">
            {/* CREDITS */}
            <div className="account-stats-credits stat">
              <label className="label" htmlFor="">
                Credits
              </label>
              <div className="credits-input input flex">
                <p>{user.credits}</p>
                <RiMoneyDollarCircleLine />
              </div>
            </div>

            {/* IMAGES UPSCALED */}
            <div className="account-stats-credits stat">
              <label className="label" htmlFor="">
                Images Upscaled
              </label>
              <div className="credits-input input flex">
                <p>{user.images.length}</p>
                <BsCardImage />
              </div>
            </div>

            {/* REVIEWS WRITTEN */}
            <div className="account-stats-credits stat">
              <label className="label" htmlFor="">
                Reviews Written
              </label>
              <div className="credits-input input flex">
                <p>{user.reviews.length}</p>
                <PiNotePencilFill />
              </div>
            </div>

            {/* PAYMENTS MADE */}
            <div className="account-stats-credits stat">
              <label className="label" htmlFor="">
                Payments Made
              </label>
              <div className="credits-input input flex">
                <p>{user.paymentID.length}</p>
                <MdOutlinePayment />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
