import React, { useEffect, useState } from "react";
import "./Register.css";
import axios from "axios";
// import { Input, Button, postData } from "../../exportsFiles";
import { Input, Button, postData } from "../../exportFiles";
const Register = () => {
  const [error, setError] = useState();
  const [response, setResponse] = useState();
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    experience: "",
    experties: "",
    avatar: null // Initialize avatar as null
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      if (!file) {
        setResponse("Avatar is required");
        return;
      }
      setError(null); // Clear any previous errors
      setUser((prev) => ({
        ...prev,
        avatar: file // Update the avatar field with the selected file
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value // Update other text fields dynamically
      }));
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!user.avatar) {
      setResponse("Avatar is required!");
    }
    if (
      [
        user.username,
        user.fullname,
        user.password,
        user.experience,
        user.experties
      ].some((field) => field?.trim() === "")
    ) {
      setResponse("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Send the form data to the backend
      const response = await postData("/api/v1/users/register", formData);

      setResponse(response);
      setError("");
      // Reset the form fields if successful
      setUser({
        fullname: "",
        username: "",
        password: "",
        email: "",
        experience: "",
        experties: "",
        avatar: null // Reset avatar to null
      });
      // Clear any previous error messages
    } catch (error) {
      setError(error?.response);
    }
  };
  return (
    <section className="register">
      <div className="register-header">
        <h3 className="register-header-title">Register as a Teacher</h3>
      </div>
      <div className="register-form-container">
        <form
          action=""
          className="register-form"
          encType="multipart/form-data"
          onSubmit={registerUser}
        >
          <div className="avatar-input-container">
            <label for="avatar-input" className="avatar-label">
              <img className="camera-icon" src="/camera-icon.png" />
              <img
                src="\teacher_avatar.png"
                alt="Avatar"
                className="avatar-preview"
                id="avatar-preview"
              />
              <input
                type="file"
                name="avatar"
                id="avatar-input"
                accept="image/*"
                onChange={(e) => handleChange(e)}
              />
            </label>
          </div>

          <div className="register-form-input-container">
            <fieldset className="register-input-fieldset">
              <legend htmlFor="" className="register-legend">
                Name
              </legend>
              <Input
                onChange={(e) => handleChange(e)}
                placeholder="Enter Your Name"
                name="fullname"
                value={user.fullname}
                className="register-input"
              />
            </fieldset>
          </div>
          <div className="register-form-input-container">
            <fieldset className="register-input-fieldset">
              <legend htmlFor="" className="register-legend">
                Username
              </legend>
              <Input
                onChange={(e) => handleChange(e)}
                placeholder="Enter username"
                name="username"
                value={user.username}
                className="register-input"
              />
            </fieldset>
          </div>
          <div className="register-form-input-container">
            <fieldset className="register-input-fieldset">
              <legend htmlFor="" className="register-legend">
                Email
              </legend>
              <Input
                onChange={(e) => handleChange(e)}
                name="email"
                value={user.email}
                placeholder="Enter Your Email"
                className="register-input"
              />
            </fieldset>
          </div>

          <div className="register-form-input-container">
            <fieldset className="register-input-fieldset">
              <legend htmlFor="" className="register-legend">
                Years of Experience
              </legend>
              <Input
                onChange={(e) => handleChange(e)}
                name="experience"
                value={user.experience}
                placeholder="Years of experience"
                className="register-input"
              />
            </fieldset>
          </div>
          <div className="register-form-input-container">
            <fieldset className="register-input-fieldset">
              <legend htmlFor="" className="register-legend">
                Experties
              </legend>
              <Input
                onChange={(e) => handleChange(e)}
                name="experties"
                value={user.experties}
                placeholder="Experties..."
                className="register-input"
              />
            </fieldset>
          </div>
          <div className="register-form-input-container">
            <fieldset className="register-input-fieldset">
              <legend htmlFor="" className="register-legend">
                Set Password
              </legend>
              <Input
                type="password"
                onChange={(e) => handleChange(e)}
                name="password"
                value={user.password}
                placeholder="Set password"
                className="register-input"
              />
            </fieldset>
          </div>
          <div className="register-button-container">
            <Button
              type="submit"
              button="Register"
              className="register-button"
            />
          </div>
        </form>
        <div className="register-Login-error-container">
          <p className="login-option-in-register">
            Already have an account? <span>Log In</span>
          </p>

          <h1>
            {error?.status === 409
              ? "User with email and Password already exist"
              : ""}
          </h1>
        </div>
      </div>
    </section>
  );
};
export default Register;
