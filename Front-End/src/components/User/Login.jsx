// src/Login.js
import React, { useState } from "react";
import "./Register.scss";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      const formData = { email, password };
      try {
        const response = await axios.post(
          "http://localhost:5000/login",
          formData
        );
        // Handle the response as needed
        const token = JSON.stringify(response.data);
        localStorage.setItem("AuthVerification", token);
        if (response.data) {
          navigate("/list");
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        {message && <div className="alert-message">{message}</div>}
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="toggleForm">
          Don't have an account? <Link to="/register">Register Here</Link>
        </div>
        <button type="submit" className="register-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
