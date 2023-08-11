import React from "react";
import "./Login.css";
import { LoginForm } from "../../components/components";
import logo from "../../components/assets/logo.png";

const Login = () => {
  return (
    <div className="login-container">
      <div className="logo-container flex">
        <img className="logo" src={logo} alt="" />
        <h1 className="logo-text">RefinedAI</h1>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
