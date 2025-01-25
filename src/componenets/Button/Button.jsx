import React from "react";
import "./Button.css";
const Button = ({ type, button, className, onClick }) => {
  return (
    <button onClick={onClick} type={type} className={`button ${className}`}>
      {button}
    </button>
  );
};

export default Button;
