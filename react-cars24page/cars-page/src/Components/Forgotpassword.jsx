import React, { useState } from "react";
import axios from "axios";
import "./Forgotpassword.css";
import withAuth from "./PrivateRoute";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3000//forgotpassword/${email}`,
        {
          newPassword,
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Password updated successfully!");
      }
    } catch (error) {
      setErrorMessage("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default withAuth(Forgotpassword);
