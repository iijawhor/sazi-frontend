import React, { useEffect, useState } from "react";
import "./Login.css";
import { Input, Button, postData } from "../../exportFiles";
const Login = ({ userDetails, setUserDetails }) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    password: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if ([user.email, user.password].some((field) => field?.trim() === "")) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await postData("/api/v1/users/login", user);
      console.log("response", response);
      setUserDetails(response?.data.data);
      setError("");
      setUser({
        password: "",
        email: ""
      });
    } catch (error) {
      setError(error?.response);
    }
  };
  return (
    <section className="login">
      <div className="login-header">
        <h3 className="login-header-title">Login</h3>
      </div>
      <div className="login-form-container">
        <form
          action=""
          className="login-form"
          encType="multipart/form-data"
          onSubmit={loginUser}
        >
          <div className="login-form-input-container">
            <fieldset className="login-input-fieldset">
              <legend htmlFor="" className="login-legend">
                Email
              </legend>
              <Input
                onChange={(e) => handleChange(e)}
                name="email"
                value={user.email}
                placeholder="Enter Your Email"
                className="login-input"
              />
            </fieldset>
          </div>

          <div className="login-form-input-container">
            <fieldset className="login-input-fieldset">
              <legend htmlFor="" className="login-legend">
                Enter Password
              </legend>
              <Input
                type="password"
                onChange={(e) => handleChange(e)}
                name="password"
                value={user.password}
                placeholder="Enter password"
                className="login-input"
              />
            </fieldset>
          </div>
          <div className="login-button-container">
            <Button type="submit" button="login" className="login-button" />
          </div>
        </form>
        <div className="login-Login-error-container">
          <p className="login-option-in-login">
            Don't have an account? <span>SignUp</span>
          </p>
        </div>
      </div>
      {userDetails?.status}
    </section>
  );
};
export default Login;
