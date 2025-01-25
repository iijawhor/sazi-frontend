import React from "react";
import "./Input.css";
const Input = ({
  placeholder,
  value,
  disabled = false,
  onChange,
  className,
  name,
  accept,
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
        accept={accept}
      />
    </div>
  );
};

export default Input;
