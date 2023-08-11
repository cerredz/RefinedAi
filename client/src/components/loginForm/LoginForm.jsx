import React, { useState, useEffect } from "react";
import "./LoginForm.css";
const LoginForm = (props) => {
  const [hasCreatedAccount, setHasCreatedAccount] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accounts")) {
      //checks if the user has created an account before, so we can redirect them to the login form
      setHasCreatedAccount(true);
    }
  }, []);
  return (
    <div className="login-form-container">
      <form className="login-form " action="">
        <div className="form-header">
          <h1>{hasCreatedAccount ? "Login" : "Create Account"}</h1>
        </div>

        <div className="form-details flex">
          {hasCreatedAccount ? (
            <>
              <label>login</label>
              <input></input>
            </>
          ) : (
            <>
              <label htmlFor="">First Name</label>
              <input type="text" />

              <label htmlFor="">Last Name</label>
              <input type="text" />
              <label htmlFor="">Username</label>
              <input type="text" />
              <label htmlFor="">Email Address</label>
              <input type="text" />
              <label htmlFor="">Password</label>
              <input type="text" />
              <label htmlFor="">Retype Password</label>
              <input type="text" />
              <p>
                Already Have An Account? <span>Login</span>
              </p>
              <div className="flex">
                <input type="checkbox" />
                <label htmlFor="">Remember me</label>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
