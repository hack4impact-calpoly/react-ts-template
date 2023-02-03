import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./createAccount.css";

export default function CreateAccount() {
  const [role, setRole] = useState("none");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      role === "none"
    ) {
      setError("All fields are required");
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }

    const phoneRegex = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (!phoneRegex.test(phone)) {
      setError("Invalid phone number");
      return;
    }

    // Call the API to create an account with email and password
    // if response is ok then navigate
    navigate("/success?from=createAccount");
  };

  return (
    <div>
      <Link to="/login">Back Arrow</Link>
      <form onSubmit={handleSubmit}>
        <h1>Create an Account</h1>
        <label htmlFor="role">
          I am a:
          <br />
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="none" selected disabled>
              Please Select...
            </option>
            <option value="Admin">Admin</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Rider">Rider</option>
          </select>
        </label>
        <label htmlFor="firstname">
          First Name
          <br />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label htmlFor="lastname">
          Last Name
          <br />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="phone">
          Phone
          <br />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <div className="password">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : " Show"}
            </button>
          </div>
        </label>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
}
