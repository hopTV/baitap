import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="topnav">
      <NavLink activeClassName="active" to="/member">
        Member
      </NavLink>
      <NavLink activeClassName="active" to="/edit">
        edit
      </NavLink>
      <NavLink activeClassName="active" to="/list">
        list
      </NavLink>
    </div>
  );
};

export default Navbar;
