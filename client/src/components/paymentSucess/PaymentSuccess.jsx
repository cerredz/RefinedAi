import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";
import { useSelector } from "react-redux";
import successIcon from "../assets/success.png";
const PaymentSuccess = () => {
  const { credits, paymentID, price, type } = useParams();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <div className="success-container flex">
      <div className="success-content">
        <div className="success-banner flex">
          <img src={successIcon} alt="" />
          <h1>Payment Successful</h1>
          <p className="grey-text">
            Your Payment Has Been Processed! Your Order Information is Down
            Below.
          </p>
        </div>
        <hr />

        <div className="success-info flex">
          <div className="success-detail flex">
            <p>Payment Type: </p>
            <p className="grey-text">{type}</p>
          </div>
          <div className="success-detail flex">
            <p>Credits Purchased: </p>
            <p className="grey-text">{credits}</p>
          </div>
          <div className="success-detail flex">
            <p>Payment ID: </p>
            <p className="grey-text">{paymentID}</p>
          </div>
          <div className="success-detail flex">
            <p>Ammount Paid: </p>
            <p className="grey-text">${price}</p>
          </div>
        </div>

        <div className="btn-container flex">
          <button onClick={() => navigate("/")} className="home">
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
