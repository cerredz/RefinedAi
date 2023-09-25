import React, { useEffect } from "react";
import "./EmailList.css";
import { useSelector, useDispatch } from "react-redux";
import { setJoinEmailList, setLeaveEmailList } from "../../state";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import {
  checkEmaiList,
  handleJoinEmailList,
  handleLeaveEmailList,
} from "../../client";

const EmailList = () => {
  const user = useSelector((state) => state.auth.user);
  const emailList = useSelector((state) => state.auth.emailList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkEmaiList(user, dispatch);
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
          <button
            className="flex leave"
            onClick={() => handleLeaveEmailList(user, dispatch, navigate)}
          >
            <AiOutlineClose />
            Leave
          </button>
        ) : (
          <>
            <button
              className="flex join"
              onClick={() => handleJoinEmailList(user, dispatch, navigate)}
            >
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
