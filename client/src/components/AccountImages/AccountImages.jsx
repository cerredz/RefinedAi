import React, { useEffect } from "react";
import "./AccountImages.css";
import { useSelector } from "react-redux/";
import { setImages } from "../../state";
import Axios from "axios";

const AccountImages = () => {
  const user = useSelector((state) => state.auth.user);

  const getUserImages = async () => {
    console.log(user);
    console.log(user._id);
    const userImages = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/retrieveImages`,
      {
        userID: user._id,
      }
    );

    console.log(userImages.data);
  };
  return (
    <div>
      <button onClick={getUserImages}>View All Images</button>
    </div>
  );
};

export default AccountImages;
