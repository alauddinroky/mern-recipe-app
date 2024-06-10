// src/Register.js
import React, { useState } from "react";
import "./Register.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required";
    // if (!register.trim()) errors.register = "Register number is required";
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
      const formData = { name, email, password };
      try {
        const response = await axios.post(
          "http://localhost:5000/register",
          formData
        );
        console.log(response.data); // Handle the response as needed
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        {/* <div className="form-group">  */}
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
          Already have an account? <Link to="/login">Login Here</Link>
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
