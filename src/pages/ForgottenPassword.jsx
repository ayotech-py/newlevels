import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function toTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s|-)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  const handleSubmit = async () => {
    setLoading(true);

    const isNullOrEmpty = (value) =>
      value === null || value === undefined || value === "";

    const body = {
      email: email,
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

    const url = `${process.env.REACT_APP_BASE_URL}/password_reset/`;

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ApiAuthorization: process.env.REACT_APP_API_KEY,
      },
      body: JSON.stringify(body),
    });
    setLoading(false);

    const response = await request.json();
    setMessage(response.message);
    if (request.status === 200) {
    } else {
      setMessage("An error occurred, please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <div className="auth-form">
        <div className="form-title">
          <h2>Forgotten Password</h2>
        </div>
        <div
          className="response-message"
          style={{ display: message.length > 0 ? "block" : "none" }}
        >
          <p className="medium-size">{message}</p>
        </div>
        <div className="input-fields">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
        </div>
        <button onClick={handleSubmit}>
          {loading ? <Loading /> : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ForgottenPassword;
