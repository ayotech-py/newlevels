import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    try {
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
        login(response.userData, response.tokens, response.username);
        navigate("/", { replace: true });
      } else {
        setShowPassword(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setMessage("An error occured");
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
        </div>
        <button onClick={handleSubmit}>
          {loading ? <Loading /> : "Login"}
        </button>
        <div className="form-actions">
          <Link to={"/auth/register"}>Don't have an account? Register</Link>
          <Link to={"/auth/forgot-password"}>Forgotten Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
