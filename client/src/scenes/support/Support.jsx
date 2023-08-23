import React from "react";
import "./Support.css";
import { Navbar, FAQ } from "../../components/components";
import supportICON from "../../components/assets/mail.png";
const Support = (props) => {
  return (
    <div>
      <Navbar />
      <FAQ />
      <div className="support-container">
        <div className="support-header flex">
          <img src={supportICON} alt="" />
          <h1>Support</h1>
        </div>

        <div className="support-text">
          <p>
            If you still have any questions please feel free to email us:{" "}
            <a href="mailto:refiinedaii@gmail.com">refiinedaii@gmail.com</a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;
