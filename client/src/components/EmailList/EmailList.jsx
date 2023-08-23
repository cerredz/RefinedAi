import React, { useEffect } from "react";
import "./EmailList.css";
import { useSelector, useDispatch } from "react-redux";
import { setJoinEmailList, setLeaveEmailList } from "../../state";
import Axios from "axios";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

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

    const response = joinedEmailList.data;

    if (response) {
      dispatch(setJoinEmailList());
    } else {
      dispatch(setLeaveEmailList());
    }
  };

  /* ADDS A USER'S EMAIL TO THE EMAIL LIST*/
  const handleJoinEmailList = async () => {
    const joinEmailList = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/emails/join`,
      user
    );

    const response = joinEmailList.data;

    if (response) {
      dispatch(setJoinEmailList());
    }
  };

  /* REMOVES A USER'S EMAIL FROM THE EMAIL LIST */
  const handleLeaveEmailList = async () => {
    const leaveEmailList = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/emails/leave`,
      user
    );

    const response = leaveEmailList.data;

    if (response.res) {
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
          <h1 className="header">Leave Email List</h1>
        ) : (
          <>
            <h1 className="header">Join RefinedAI's Email List</h1>
            <p className="grey-text subheader">
              Be the First to Gain Access to Exclusive Features, Insights, and
              Exciting Announcements.
            </p>
          </>
        )}
      </div>

      <div className="btn-container flex">
        {emailList ? (
          <button className="flex leave" onClick={handleLeaveEmailList}>
            <AiOutlineClose />
            Leave
          </button>
        ) : (
          <>
            <button className="flex join" onClick={handleJoinEmailList}>
              <AiOutlineCheck />
              Join{" "}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailList;
