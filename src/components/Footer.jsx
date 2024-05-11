import React from "react";
import logo from "../images/logo.jpeg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-main">
        <div className="footer-description">
          <img src={logo} alt="" />
          <p>
            Experience the convenience of online shopping with our reliable and
            efficient delivery services.
          </p>
        </div>
        <div className="footer-categories">
          <h3>CATEGORIES</h3>
          <ul>
            <li>Bags</li>
            <li>Jobs</li>
            <li>Electronics</li>
            <li>Beauty</li>
          </ul>
        </div>
        <div className="footer-useful-links">
          <h3>USEFUL LINKS</h3>
          <ul>
            <li>Sell on Newlevels</li>
            <li>Contact Us</li>
            <li>Help</li>
          </ul>
        </div>
        <div className="footer-contact-us">
          <h3>CONTACT US</h3>
          <div className="contact-link">
            <i class="fa-solid fa-envelope"></i>
            <p>contact@newlevels.com</p>
          </div>
          <div className="contact-link">
            <i class="fa-solid fa-phone"></i>
            <p>+234 903 124 2345</p>
          </div>
        </div>
      </div>
      <div className="rights">
        <p>
          &copy; 2024 Copyright <span> NEWLEVELS</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
