import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profileinfo.css";

const Profileinfo = () => {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
  const navigate = useNavigate();

  const handleUpdate = async () => {
    // Check if new email and new password are not empty
    if (!newEmail.trim() || !newPassword.trim()) {
      window.alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/signup/${userData.userName}`,
        {
          email: newEmail || email,
          password: newPassword || password,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        window.alert("User information updated successfully");
      } else {
        window.alert("Failed to update user information");
      }
    } catch (error) {
      console.error("Error updating credentials:", error);
      window.alert("Failed to update user information");
    }
  };

  if (!userData || typeof userData !== "object") {
    return <div className="profile-container">No user profile found.</div>;
  }

  const { userName } = userData;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <p className="username">Username: {userName}</p>
        <p className="email">Email: {email}</p>
      </div>
      <div>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span className="checkbox-text">
            Click here to Update Credentials!
          </span>
        </label>
      </div>

      <div className="update">
        <div className={`update-form ${isChecked ? "active" : ""}`}>
          {isChecked && (
            <>
              <input
                type="email"
                placeholder="New Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="input-field"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-field"
              />
              <button onClick={handleUpdate} className="update-button">
                Update Credentials
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profileinfo;
