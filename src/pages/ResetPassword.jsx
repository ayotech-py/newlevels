import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { uid, token } = useParams();

  function toTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s|-)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  const handleSubmit = async () => {
    setLoading(true);

    const url = `${process.env.REACT_APP_BASE_URL}/password_reset_confirm/${uid}/${token}/`;

    const isNullOrEmpty = (value) =>
      value === null || value === undefined || value === "";

    const body = {
      password: password,
    };

    for (const key in body) {
      if (body.hasOwnProperty(key) && isNullOrEmpty(body[key])) {
        setMessage(
          `${toTitleCase(key.replaceAll("_", " "))} cannot be blank or empty`,
        );
        setLoading(false);
        return null;
      }
    }

    if (password !== confirmPassword) {
      setMessage("Password doesn't match");
      setLoading(false);
      return null;
    } else if (password.length < 8) {
      setMessage("Password must be greater than 8 characters");
      setLoading(false);
      return null;
    }

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ApiAuthorization: process.env.REACT_APP_API_KEY,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();
    setMessage(response.message);
    setLoading(false);
    if (request.status === 200) {
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 3000);
    } else {
      try {
        setMessage(response.message);
      } catch (erro) {
        setMessage("An error occurred, please try again later.");
      }
    }
  };

  return (
    <div className="form-card">
      <div className="auth-form">
        <div className="form-title">
          <h2>Reset Password</h2>
        </div>
        <div
          className="response-message"
          style={{ display: message.length > 0 ? "block" : "none" }}
        >
          <p className="medium-size">{message}</p>
        </div>
        <div className="input-fields">
          <div className="input-password-container">
            <input
              type={showPassword ? `text` : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <i
              class={
                showPassword ? "fa fa-eye-slash r-icon" : "fa fa-eye r-icon"
              }
              onClick={() =>
                showPassword ? setShowPassword(false) : setShowPassword(true)
              }
            ></i>
          </div>
          <div className="input-password-container">
            <input
              type={showPassword ? `text` : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            <i
              class={
                showPassword ? "fa fa-eye-slash r-icon" : "fa fa-eye r-icon"
              }
              onClick={() =>
                showPassword ? setShowPassword(false) : setShowPassword(true)
              }
            ></i>
          </div>
        </div>
        <button onClick={handleSubmit}>
          {loading ? <Loading /> : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
