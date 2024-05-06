import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="form-card">
      <div className="auth-form">
        <div className="form-title">
          <h2>Login to your account</h2>
        </div>
        <div className="input-fields">
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Login</button>
        <div className="form-actions">
          <Link to={"/auth/register"}>Don't have an account? Register</Link>
          <Link>Forgotten Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
