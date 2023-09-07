import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import "./HomepageReturn.css";
const HomepageReturn = (props) => {
  const navigate = useNavigate();

  return (
    <div className="homepage-return-container flex">
      <button onClick={() => navigate("/")} className="btn-home flex">
        <AiOutlineHome />
        <p>Home</p>
      </button>
    </div>
  );
};

export default HomepageReturn;
