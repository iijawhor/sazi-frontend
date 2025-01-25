import React, { useEffect } from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Logo, Logout } from "../../exportFiles";
import { updateHeader } from "../../store/slices/updateHeaderSlice";
import { useDispatch } from "react-redux";
const Sidebar = ({ sidebar }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <div className="logo-container">
        <Logo />
      </div>
      <div>
        <ul className="sidebar-items">
          {sidebar.map((sidebar, index) => (
            <NavLink
              onClick={() => dispatch(updateHeader(sidebar.name))}
              key={index}
              exact={sidebar.active}
              to={sidebar.path}
              className={({ isActive }) => (isActive ? "active" : "nav-item")}
            >
              {sidebar.name}
            </NavLink>
          ))}
          s
        </ul>
      </div>
      <div className="logout-button-container">
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;
