import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setJoinEmailList, setLeaveEmailList } from "../../state";
import { checkEmaiList } from "../../client";
import { useNavigate } from "react-router-dom";
import { handleJoinEmailList, handleLeaveEmailList } from "../../client";
import "./EmailListAdvert.css";

const EmailListAdvert = (props) => {
  const user = useSelector((state) => state.auth.user);
  const emailList = useSelector((state) => state.auth.emailList);
  const dispatch = useDispatch();
  const [enteredEmail, setEnteredEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) checkEmaiList(user, dispatch, navigate);
  }, []);

  return (
    <div className="email-advert-container">
      <div className="email-advert-content flex">
        <span className="glow glow-1"></span>
        <div className="email-advert-image"></div>
        {!emailList ? (
          <div className="email-advert-text">
            {/* USER NOT IN EMAIL LIST  */}
            <h3>Join Our Email List</h3>
            <p className="grey-text">
              Stay Up to date with the latest RefinedAI news, announcments, and
              updates.
            </p>

            <div className="email-advert-join flex">
              {user ? (
                <div className="user-input">
                  <input
                    type="text"
                    value={user.email}
                    className="user-email"
                  />
                </div>
              ) : (
                <div className="user-input">
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    className="email"
                    onChange={(e) => setEnteredEmail(e.target.value)}
                    value={enteredEmail}
                  />
                </div>
              )}

              <button
                onClick={() => handleJoinEmailList(user, dispatch, navigate)}
              >
                Join
              </button>
            </div>
          </div>
        ) : (
          <div className="email-advert-text">
            {/* USER IS IN EMAIL LIST  */}
            <h3>Leave Email List</h3>
            <p className="grey-text">
              Unsatisfied with being in our email list? No worries, click the
              button below to leave the email list
            </p>
            <div className="email-advert-leave flex">
              <button
                onClick={() => handleLeaveEmailList(user, dispatch, navigate)}
              >
                Leave
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailListAdvert;
