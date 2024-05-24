import React from "react";
import logo from "../images/logo.jpeg";
import { useAuth } from "./AuthProvider";
import { Link } from "react-router-dom";

const Footer = () => {
  const { user } = useAuth();

  return (
    <div className="footer">
      <div className="footer-main">
        <div className="footer-description">
          <img src={logo} alt="" />
          <p>
            Your go-to Campus Marketplace! Unrivaled convenience for buying,
            selling, and connecting within your university community.
          </p>
          <div class="social-icons">
            <Link
              to="https://www.instagram.com/newlevels"
              target="_blank"
              aria-label="Instagram"
              rel="noreferrer"
            >
              <i class="fab fa-instagram"></i>
            </Link>
            <Link
              to="https://www.twitter.com/Newlevelsscotty"
              target="_blank"
              aria-label="Twitter"
              rel="noreferrer"
            >
              <i class="fab fa-twitter"></i>
            </Link>
            <Link
              to="https://www.facebook.com/profile.php?id=100092301401013"
              target="_blank"
              aria-label="Facebook"
              rel="noreferrer"
            >
              <i class="fab fa-facebook"></i>
            </Link>
          </div>
        </div>
        <div className="footer-useful-links">
          <h3>USEFUL LINKS</h3>
          <ul>
            <li>
              <Link to={user ? "/ads" : "/auth/login"}>Sell on Newlevels</Link>
            </li>
            <li>
              <Link
                to={
                  "https://api.whatsapp.com/send?phone=2348117245997&text=Hello"
                }
              >
                Contact us on Whatsapp
              </Link>
            </li>
            <li>
              <Link
                to={
                  "https://api.whatsapp.com/send?phone=2348117245997&text=Hello"
                }
              >
                Help
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-contact-us">
          <h3>CONTACT US</h3>
          <Link to={"mailto:contact@newlevels.com"} className="contact-link">
            <i class="fa-solid fa-envelope"></i>
            <p>newlevelsscotty@gmail.com</p>
          </Link>
          <Link to={"tel:+2348117246049"} className="contact-link">
            <i class="fa-solid fa-phone"></i>
            <p>+234 811 724 6049</p>
          </Link>
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
