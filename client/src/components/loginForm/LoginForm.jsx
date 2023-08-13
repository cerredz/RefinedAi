import React, { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import "./LoginForm.css";
const LoginForm = (props) => {
  const [hasCreatedAccount, setHasCreatedAccount] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);

  const [errors, setErrors] = useState({
    firstName: true,
    lastName: false,
    username: false,
    email: false,
    password: false,
    retypePassword: false,
  });

  useEffect(() => {
    if (localStorage.getItem("accounts")) {
      //checks if the user has created an account before, so we can redirect them to the login form
      setHasCreatedAccount(true);
    }
  }, []);

  const handleSignInClick = () => {};

  return (
    <div className="login-form-container">
      <form className="login-form " action="">
        <div className="form-header">
          <h1>{hasCreatedAccount ? "Login" : "Create Account"}</h1>
          <p className="form-subtitle">
            {hasCreatedAccount
              ? ""
              : "Join the community and gain access to world class upscaling services"}
          </p>
        </div>

        <div className="form-details flex">
          {hasCreatedAccount ? (
            <>
              <div className="form-account">
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Email Address" />
                <input type="password" placeholder="Password" />
              </div>
            </>
          ) : (
            <>
              <div className="form-names flex">
                <input type="text" placeholder="First Name" />

                <input type="text" placeholder="Last Name" />
              </div>

              <div className="form-account flex">
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Email Address" />
                <input type="password" placeholder="Password" />

                <input type="password" placeholder="Retype Password" />
                <div
                  onClick={() => handleSignInClick}
                  className="btn-container flex "
                >
                  <p className="btn">Sign up</p>
                  <BsArrowRight />
                </div>
                <p>
                  Already Have An Account?{" "}
                  <span onClick={() => setHasCreatedAccount(true)}>Login</span>
                </p>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
