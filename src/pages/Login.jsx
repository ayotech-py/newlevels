import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
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

    const url = `${process.env.REACT_APP_BASE_URL}/auth-login/`;

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
      login(response.userData, response.tokens);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="form-card">
      <div className="auth-form">
        <div className="form-title">
          <h2>Login to your account</h2>
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button onClick={handleSubmit}>
          {loading ? <Loading /> : "Login"}
        </button>
        <div className="form-actions">
          <Link to={"/auth/register"}>Don't have an account? Register</Link>
          <Link>Forgotten Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
