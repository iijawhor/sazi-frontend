import React from "react";
import "./Input.css";
const Input = ({
  placeholder,
  value,
  disabled = false,
  onChange,
  className,
  name,
  type = "text"
}) => {
  return (
    <div className="input-container">
      <input
        className={`input ${className}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
