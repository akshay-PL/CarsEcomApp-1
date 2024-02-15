import React from "react";
import "./Profileinfo.css";

const Profileinfo = () => {
  // Retrieve values from localStorage using the common key '1'
  const userData = JSON.parse(localStorage.getItem("user"));

  // Check if values are present before rendering
  if (userData === null || typeof userData !== "object") {
    return <div>No user profile found.</div>;
  }

  const { userName, email } = userData;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div>
        <p>User: {userName}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default Profileinfo;
