import React from "react";
import "./Button.css";
const Button = ({ type, button, className }) => {
  return (
    <button type={type} className={`button ${className}`}>
      {button}
    </button>
  );
};

export default Button;
