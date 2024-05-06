import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="newlevels-header">
      <div className="brand-name">
        <h2>NewLevels</h2>
      </div>
      <div className="nav-list">
        <Link to={"/auth/register"}>
          <i class="fa-regular fa-user"></i>
          <p>Login/Register</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
