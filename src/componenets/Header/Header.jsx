import React from "react";
import { useSelector } from "react-redux";
import { Input } from "../../exportFiles";
import "./Header.css";
const Header = () => {
  const title = useSelector((state) => state.header.title);
  const userDetails = useSelector((state) => state.user.userDetails);

  return (
    <div className="header">
      <span className="header-title">{title}</span>
      <div className="header-input">
        <Input
          className="search-input"
          placeholder="Search Student,Teacher, Assignments, Notes..."
        />
      </div>
      <div className="header-profile">
        <p>{userDetails.user?.fullname}</p>
        <img
          src={userDetails.user?.avatar}
          alt=""
          className="profile-picture"
        />
      </div>
    </div>
  );
};

export default Header;
