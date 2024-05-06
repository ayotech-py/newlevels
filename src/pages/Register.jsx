import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="form-card">
      <div className="auth-form">
        <div className="form-title">
          <h2>Create an Account</h2>
        </div>
        <div className="input-fields">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
        </div>
        <button>Register</button>
        <div className="form-actions">
          <Link to={"/auth/login"}>Already have an account? Login</Link>
          <Link>Forgotten Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
