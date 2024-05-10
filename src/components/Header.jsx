import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Header = () => {
  const { user } = useAuth();
  const { logout } = useAuth();
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="newlevels-header">
      <div className="brand-name">
        <Link to="/">
          <h2>NewLevels</h2>
        </Link>
      </div>
      {user ? (
        <div>
          <div className="nav-list large-screen-nav">
            <div className="db-profile">
              <img src={user.customer.profile_image} alt="" srcset="" />
              <h4>Welcome back, {user.customer.name}!</h4>
            </div>
            <Link to={"/ads"}>
              <i className="fas fa-ad"></i>
              <p>My Ads</p>
            </Link>
            <Link to={"/"}>
              <i class="fa-solid fa-comment-dots"></i>
              <p>Chats</p>
            </Link>
            <Link to={"/profile"}>
              <i class="fa-regular fa-user"></i>
              <p>Profile</p>
            </Link>
            <Link to={"/"} onClick={logout}>
              <i class="fa-solid fa-right-from-bracket"></i>
              <p>Logout</p>
            </Link>
          </div>
          <div className="open-btn" onClick={() => setMobileNav(true)}>
            <i class="fa-solid fa-bars"></i>
          </div>
          <div
            className={`nav-list mobile-nav ${mobileNav ? "show-toggle" : "hidden-toggle"}`}
          >
            <div className="mobile-top-close">
              <div className="db-profile">
                <img src={user.customer.profile_image} alt="" srcset="" />
                <h4>Welcome back, {user.customer.name}!</h4>
              </div>
              <div className="close-btn" onClick={() => setMobileNav(false)}>
                <i class="fa fa-xmark"></i>
              </div>
            </div>
            <Link to={"/ads"}>
              <i className="fas fa-ad"></i>
              <p>My Ads</p>
            </Link>
            <Link to={"/"}>
              <i class="fa-solid fa-comment-dots"></i>
              <p>Chats</p>
            </Link>
            <Link to={"/profile"}>
              <i class="fa-regular fa-user"></i>
              <p>Profile</p>
            </Link>
            <Link to={"/"} onClick={logout}>
              <i class="fa-solid fa-right-from-bracket"></i>
              <p>Logout</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="nav-list">
          <Link to={"/auth/login"}>
            <i class="fa-regular fa-user"></i>
            <p>Login/Register</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
