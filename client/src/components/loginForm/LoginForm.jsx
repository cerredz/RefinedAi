import React, { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useDispath } from "react-redux";
import { setLogin } from "../../state";
import Axios from "axios";
import "./LoginForm.css";

const initialFormValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  retypePassword: "",
};

const LoginForm = (props) => {
  const [hasCreatedAccount, setHasCreatedAccount] = useState(false);
  const [formData, setFormData] = useState(initialFormValues);

  const [errors, setErrors] = useState({
    firstName: false,
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

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    //unndo error messages as user is typing
    if (formData.firstName.length > 0 && errors.firstName) {
      //user has entered first name
      setErrors((prevValues) => ({
        ...prevValues,
        firstName: false,
      }));
      return;
    }

    if (formData.lastName.length > 0 && errors.lastName) {
      //user has entered last name
      setErrors((prevValues) => ({
        ...prevValues,
        lastName: false,
      }));
      return;
    }

    if (formData.password.length >= 6 && errors.password) {
      //password length has been corrected
      setErrors((prevValues) => ({
        ...prevValues,
        password: false,
      }));
      return;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (emailRegex.test(formData.email) && errors.email) {
      //valid email address inputted
      setErrors((prevValues) => ({
        ...prevValues,
        email: false,
      }));
      return;
    }

    if (
      formData.password === formData.retypePassword &&
      errors.retypePassword
    ) {
      //retype password and password not match
      setErrors((prevValues) => ({
        ...prevValues,
        retypePassword: false,
      }));
      return;
    }
  }, [formData]);

  //checks if the current typed username is already in the database
  const checkUserName = async (username) => {
    try {
      const usernameTaken = await Axios.get(
        `http://localhost:3001/auth/check/${username}`
      );

      return usernameTaken;
    } catch (error) {
      console.error(error);
    }
  };

  //updates user information based on what they fill out in the form
  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    //check if the username is taken
    if (name === "username" && value.length !== 0) {
      const userExists = await checkUserName(value);

      if (userExists.data) {
        //username is already taken
        setErrors((prevValues) => ({
          ...prevValues,
          username: true,
        }));
      } else {
        setErrors((prevValues) => ({
          ...prevValues,
          username: false,
        }));
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //registers user if no errors found
  const handleSignInClick = async () => {
    //handle error cases
    if (formData.firstName.length === 0) {
      //no first name entered
      setErrors((prevValues) => ({
        ...prevValues,
        firstName: true,
      }));
      return;
    }

    if (formData.lastName.length === 0) {
      //no last name entered
      setErrors((prevValues) => ({
        ...prevValues,
        lastName: true,
      }));
      return;
    }

    if (formData.username.length === 0) {
      //no username entered
      setErrors((prevValues) => ({
        ...prevValues,
        username: true,
      }));
      return;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email) || formData.email.length === 0) {
      //incorrect email format
      setErrors((prevValues) => ({
        ...prevValues,
        email: true,
      }));
      return;
    }

    if (formData.password.length < 6) {
      //password under 6 letters entered
      setErrors((prevValues) => ({
        ...prevValues,
        password: true,
      }));
      return;
    }

    if (formData.password !== formData.retypePassword) {
      //retyped password does not match password
      setErrors((prevValues) => ({
        ...prevValues,
        retypePassword: true,
      }));
      return;
    }

    if (
      !errors.firstName &&
      !errors.lastName &&
      !errors.email &&
      !errors.username &&
      !errors.password &&
      !errors.retypePassword
    ) {
      //no errors found, register the account for the user
      const registerUser = await Axios.post(
        `http://localhost:3001/auth/register`,
        formData
      );
      console.log(registerUser);
      if (!registerUser.data) {
        setErrors((prevValues) => ({
          ...prevValues,
          email: true,
        }));
        return;
      }
      console.log(registerUser);
      const savedUser = registerUser.data.json();

      setFormData(initialFormValues);

      if (savedUser) {
        console.log(savedUser);
        localStorage.setItem("email", savedUser);
      }
    }
  };

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
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />

                <input
                  type="text"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  placeholder="Retype Password"
                  name="retypePassword"
                  value={formData.retypePassword}
                  onChange={handleInputChange}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-names flex">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`${errors.firstName ? "error-border-bottom" : ""}`}
                />
                {errors.firstName && (
                  <p className="error-message">First Name Required</p>
                )}

                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`${errors.lastName ? "error-border-bottom" : ""}`}
                />
                {errors.lastName && (
                  <p className="error-message">Last Name Required</p>
                )}
              </div>

              <div className="form-account flex">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`${errors.username ? "error-border-bottom" : ""}`}
                />
                {errors.username && (
                  <p className="error-message">Username Taken</p>
                )}
                <input
                  type="text"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${errors.email ? "error-border-bottom" : ""}`}
                />
                {errors.email && (
                  <p className="error-message">Input Valid Email Address</p>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${errors.password ? "error-border-bottom" : ""}`}
                />
                {errors.password && (
                  <p className="error-message">Minimum Password Length: 6</p>
                )}

                <input
                  type="password"
                  placeholder="Retype Password"
                  name="retypePassword"
                  value={formData.retypePassword}
                  onChange={handleInputChange}
                  className={`${
                    errors.retypePassword ? "error-border-bottom" : ""
                  }`}
                />
                {errors.retypePassword && (
                  <p className="error-message">
                    Please Retype Correct Password
                  </p>
                )}

                <div
                  onClick={handleSignInClick}
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
