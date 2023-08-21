import React, { useEffect } from "react";
import "./EmailList.css";
import { useSelector, useDispatch } from "react-redux";
import { setJoinEmailList, setLeaveEmailList } from "../../state";
import Axios from "axios";

const EmailList = () => {
  const user = useSelector((state) => state.auth.user);
  const emailList = useSelector((state) => state.auth.emailList);
  const dispatch = useDispatch();

  /* CHECK IF USER HAS JOINED EMAIL LIST */
  const checkEmaiList = async () => {
    const joinedEmailList = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/emails/checkUser`,
      user
    );
    console.log(joinedEmailList.data);
    const response = joinedEmailList.data;

    if (response) {
      dispatch(setJoinEmailList());
    } else {
      dispatch(setLeaveEmailList());
    }
  };

  useEffect(() => {
    checkEmaiList();
  }, []);
  return (
    <div className="email-list-container">
      <div className="email-header">
        {emailList ? (
          <h1>Leave Email List</h1>
        ) : (
          <>
            <h1>Join RefinedAI's Email List</h1>
            <p>Gain Access to new features, news, and announcements</p>
          </>
        )}
      </div>

      <div className="btn-container">
        {emailList ? (
          <button>Leave</button>
        ) : (
          <>
            <button>Join </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailList;
